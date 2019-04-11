import { Express } from 'express';
import passport from 'passport';

const login = (app: Express) => {
  app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user.username);
  });
};

export default login;
