import { Express, Request, Response, NextFunction } from 'express';
import { Strategy as LocalStratery } from 'passport-local';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { RestMethod } from '@restapp/module-server-ts';
import settings from '../../../../../settings';
import AccessModule from '../AccessModule';
import { refreshTokens } from './controllers';
import createTokens from './createTokens';

const {
  auth: { secret }
} = settings;

const beforeware = (app: Express) => {
  app.use(passport.initialize());
};

const accessMiddleware = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('jwt', { session: false }, (_err, user, info) => {
    if (info) {
      res.locals.error = info;
      return next();
    }
    req.user = { ...user };
    return next();
  })(req, res, next);

const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  }
  return res.send({
    status: 401,
    errors: {
      message: res.locals.error ? res.locals.error.message : 'unauthorized'
    }
  });
};

const grant = async (identity: any, req: any, passwordHash: string = '') => {
  const refreshSecret = settings.auth.secret + (passwordHash || '');

  const [accessToken, refreshToken] = await createTokens(identity, settings.auth.secret, refreshSecret, req.t);

  return {
    accessToken,
    refreshToken
  };
};

const loginMiddleware = (req: any, res: any, next: any) => {
  passport.authenticate('local', { session: settings.auth.session.enabled }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        errors: {
          message: info ? info.message : 'Login failed'
        }
      });
    }

    req.login(user, { session: settings.auth.session.enabled }, async (loginErr: any) => {
      if (loginErr) {
        res.send(loginErr);
      }
      const tokens = settings.auth.jwt.enabled ? await grant(user, req, user.passwordHash) : null;

      return res.json({ user, tokens });
    });
  })(req, res, next);
};

const onAppCreate = ({ appContext }: AccessModule) => {
  passport.use(
    new LocalStratery({ usernameField: 'usernameOrEmail' }, async (username: string, password: string, done: any) => {
      const { user, message } = await appContext.user.validateLogin(username, password);

      if (message) {
        return done(null, false, { message });
      }
      return done(null, user);
    })
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
      },
      (jwtPayload: any, cb: any) => {
        return cb(null, jwtPayload.identity);
      }
    )
  );
};

const jwtAppContext = {
  auth: {
    loginMiddleware
  }
};

export default (settings.auth.jwt.enabled
  ? new AccessModule({
      beforeware: [beforeware],
      onAppCreate: [onAppCreate],
      grant: [grant],
      appContext: jwtAppContext,
      apiRouteParams: [
        {
          method: RestMethod.POST,
          route: 'refreshToken',
          controller: refreshTokens
        }
      ],
      accessMiddleware: [accessMiddleware, checkAuthentication]
    })
  : undefined);
