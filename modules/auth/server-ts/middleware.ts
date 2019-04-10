import { Express } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

import initPassport from './initPassport';

const middleware = (app: Express) => {
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

export default middleware;
