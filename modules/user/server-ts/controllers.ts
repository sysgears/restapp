import { Request, Response } from 'express';
import passport from 'passport';

import { ref } from '.';

import settings from '../../../settings';

const {
  auth: { session, jwt }
} = settings;

export const login = (req: Request, res: Response) => {
  passport.authenticate('local', { session: session.enabled }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user
      });
    }

    req.login(user, { session: session.enabled }, async loginErr => {
      if (loginErr) {
        res.send(loginErr);
      }
      const [accessToken, refreshToken] = jwt.enabled ? await ref.module.grant(user) : null;

      return res.json({ user, accessToken, refreshToken });
    });
  })(req, res);
};
