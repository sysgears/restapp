import { Express } from 'express';
import { Strategy } from 'passport-local';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

import ServerModule from '@restapp/module-server-ts';

const beforeware = (app: Express) => {
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

const onAppCreate = () => {
  passport.use(
    'login',
    new Strategy((username: string, password: string, done: any) => {
      if (username !== userDB.username || password !== userDB.password) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, userDB);
    })
  );
};

export default new ServerModule({
  beforeware: [beforeware],
  onAppCreate: [onAppCreate]
});
