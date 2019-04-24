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

const userDB: User = {
  username: 'test-user',
  password: '123',
  id: 1
};

interface User {
  username: string;
  password: string;
  id: number;
}

const grant = async (identity: any, req: any, passwordHash: string = '') => {
  const refreshSecret = settings.auth.secret + passwordHash;
  const [accessToken, refreshToken] = await createTokens(identity, settings.auth.secret, refreshSecret, req.t);

  return {
    accessToken,
    refreshToken
  };
};

const onAppCreate = () => {
  passport.use(
    new LocalStratery((username: string, password: string, done: any) => {
      if (username !== userDB.username || password !== userDB.password) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, userDB);
    })
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
      },
      (jwtPayload: any, cb: any) => {
        return cb(null, jwtPayload.user);
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
