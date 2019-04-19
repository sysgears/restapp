import { Express } from 'express';
import { Strategy as LocalStratery } from 'passport-local';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import ServerModule, { RestMethod } from '@restapp/module-server-ts';
import settings from '../../../settings';
import { refreshTokens } from './controllers';

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
      (jwtPayload: User, cb: any) => {
        return cb(null, jwtPayload);
      }
    )
  );
};

export { default as createTokens } from './createTokens';

export default new ServerModule({
  beforeware: [beforeware],
  onAppCreate: [onAppCreate],
  apiRouteParams: [
    {
      method: RestMethod.POST,
      route: 'refreshToken',
      middleware: [refreshTokens]
    }
  ],
  accessMiddleware
});
