import { Express } from 'express';
import { Strategy as LocalStratery } from 'passport-local';
import bodyParser from 'body-parser';
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
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
};

const accessMiddleware = passport.authenticate('jwt', { session: false });

const grant = async (identity: any, req: any, passwordHash: string = '') => {
  const refreshSecret = settings.auth.secret + passwordHash;
  const [accessToken, refreshToken] = await createTokens(identity, settings.auth.secret, refreshSecret, req.t);

  return {
    accessToken,
    refreshToken
  };
};

const onAppCreate = ({ appContext }: any) => {
  passport.use(
    new LocalStratery(async (username: string, password: string, done: any) => {
      const { identity, message } = appContext.user.validateLogin(username, password);

      if (message) {
        return done(null, false, { message });
      }
      return done(null, identity);
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

export default (settings.auth.jwt.enabled
  ? new AccessModule({
      beforeware: [beforeware],
      onAppCreate: [onAppCreate],
      grant: [grant],
      apiRouteParams: [
        {
          method: RestMethod.POST,
          route: 'refreshToken',
          middleware: [refreshTokens]
        }
      ],
      accessMiddleware
    })
  : undefined);
