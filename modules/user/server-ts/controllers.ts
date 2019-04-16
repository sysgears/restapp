import { Request, Response } from 'express';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';

import settings from '../../../settings';

const {
  auth: { session, jwt, secret }
} = settings;

export const login = (req: Request, res: Response) => {
  passport.authenticate('local', { session: session.enabled }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user
      });
    }

    req.login(user, { session: session.enabled }, loginErr => {
      if (loginErr) {
        res.send(loginErr);
      }

      const token = jwt.enabled ? jsonwebtoken.sign({ user }, secret, { expiresIn: jwt.tokenExpiresIn }) : null;

      return res.json({ user, token });
    });
  })(req, res);
};
