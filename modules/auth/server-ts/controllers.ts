import { RestMethod } from '@restapp/module-server-ts';
import passport from 'passport';

export default [
  {
    route: '/login',
    method: RestMethod.POST,
    controller: passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  }
];
