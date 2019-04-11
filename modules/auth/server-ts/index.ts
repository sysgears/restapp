import { Express } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

import ServerModule from '@restapp/module-server-ts';
import initPassport from './initPassport';
import login from './middlewareApi/login';
import admin from './middlewareApi/admin';

const beforeware = (app: Express) => {
  initPassport();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    session({
      secret: 'passport-tutorial',
      cookie: { maxAge: 60000 },
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

export default new ServerModule({
  beforeware: [beforeware],
  middlewareApi: [login, admin]
});
