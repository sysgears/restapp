import { Express, Request, Response } from 'express';
import { Strategy } from 'passport-local';
import session from 'express-session';
import passport from 'passport';

import { RestMethod } from '@restapp/module-server-ts';

import settings from '../../../../../settings';
import AccessModule from '../AccessModule';
import { logout } from './controllers';

const FileStore = require('session-file-store')(session);

const {
  auth: { session: sessionSetting }
} = settings;

const beforeware = (app: Express) => {
  app.use(
    session({
      secret: sessionSetting.secret,
      store: __DEV__ ? new FileStore() : sessionSetting.store,
      cookie: sessionSetting.cookie,
      resave: sessionSetting.resave,
      saveUninitialized: sessionSetting.saveUninitialized
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

const accessMiddleware = (req: Request, res: Response, next: any) =>
  req.isAuthenticated()
    ? next()
    : res.status(401).send({
        errors: {
          message: 'unauthorized'
        }
      });

const loginMiddleware = (req: any, res: any, next: any) => {
  passport.authenticate('local', { session: sessionSetting.enabled }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        errors: {
          message: info ? info.message : 'Login failed'
        }
      });
    }

    req.login(user, { session: sessionSetting.enabled }, async (loginErr: any) => {
      if (loginErr) {
        res.send(loginErr);
      }

      return res.json({ user });
    });
  })(req, res, next);
};

const onAppCreate = ({ appContext }: AccessModule) => {
  passport.serializeUser((identity: { id: number }, cb) => {
    cb(null, identity.id);
  });

  passport.deserializeUser(async (id, cb) => {
    const identity = await appContext.user.getIdentity(id);
    return cb(null, identity);
  });

  passport.use(
    new Strategy({ usernameField: 'usernameOrEmail' }, async (username: string, password: string, done: any) => {
      const { user, message } = await appContext.user.validateLogin(username, password);

      if (message) {
        return done(null, false, { message });
      }
      return done(null, user);
    })
  );
};

const sessionAppContext = {
  auth: {
    loginMiddleware
  }
};

export default (settings.auth.session.enabled
  ? new AccessModule({
      beforeware: [beforeware],
      onAppCreate: [onAppCreate],
      accessMiddleware: [accessMiddleware],
      appContext: sessionAppContext,
      apiRouteParams: [
        {
          method: RestMethod.POST,
          route: 'logout',
          controller: logout
        }
      ]
    })
  : undefined);
