import { Express, Request, Response } from 'express';
import { Strategy } from 'passport-local';
import session from 'express-session';
import passport from 'passport';

import { RestMethod } from '@restapp/module-server-ts';

import { access } from '../../';
import settings from '../../../../../settings';
import AccessModule from '../AccessModule';
import { logout } from './controllers';

const FileStore = require('session-file-store')(session);

const beforeware = (app: Express) => {
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
  req.isAuthenticated()
    ? next()
    : res.send({
        errors: {
          message: 'unauthorized'
        }
      });

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
      const tokens = settings.auth.jwt.enabled ? await access.grantAccess(user, req, user.passwordHash) : null;

      return res.json({ user, tokens });
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
