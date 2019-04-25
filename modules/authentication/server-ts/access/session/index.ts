import { Express, Request, Response } from 'express';
import { Strategy } from 'passport-local';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

import { RestMethod } from '@restapp/module-server-ts';

import settings from '../../../../../settings';
import AccessModule from '../AccessModule';
import { logout } from './controllers';

const FileStore = require('session-file-store')(session);

const beforeware = (app: Express) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    session({
      secret: 'secret',
      store: __DEV__ ? new FileStore() : null,
      cookie: { maxAge: 60000 },
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

const accessMiddleware = (req: Request, res: Response, next: any) =>
  req.isAuthenticated() ? next() : res.send('unauthorized');

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

passport.serializeUser((user: User, cb) => {
  cb(null, user.username);
});

passport.deserializeUser((username, cb) => {
  if (username === userDB.username) {
    return cb(null, userDB);
  }
  return cb(null);
});

const onAppCreate = ({ appContext }: any) => {
  passport.use(
    new Strategy(async (username: string, password: string, done: any) => {
      const { identity, message } = await appContext.validateLogin(username, password);

      if (message) {
        return done(null, false, { message });
      }
      return done(null, identity);
    })
  );
};

export default (settings.auth.session.enabled
  ? new AccessModule({
      beforeware: [beforeware],
      onAppCreate: [onAppCreate],
      accessMiddleware,
      apiRouteParams: [
        {
          method: RestMethod.POST,
          route: 'logout',
          middleware: [logout]
        }
      ]
    })
  : undefined);
