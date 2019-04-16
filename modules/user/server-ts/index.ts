import { Request, Response } from 'express';
import passport from 'passport';

import ServerModule, { RestMethod } from '@restapp/module-server-ts';
import settings from '../../../settings';

const {
  auth: { session, jwt }
} = settings;

const login = (req: Request, res: Response) => {
  passport.authenticate('local', { session: session.enabled }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Logindd failed',
        user
      });
    }

    req.login(user, { session: session.enabled }, loginErr => {
      if (loginErr) {
        res.send(loginErr);
      }

      const token = jwt.enabled ? 'create tokens' : null;

      return res.json({ user, token });
    });
  })(req, res);
};

export default new ServerModule({
  apiRouteParams: [
    {
      method: RestMethod.POST,
      route: 'login',
      middleware: [login]
    }
  ]
});
