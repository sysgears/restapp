import { Express } from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import { RestMethod } from '@restapp/module-server-ts';

import { auth, onAuthenticationSuccess } from './controllers';
import AuthModule from '../AuthModule';
import settings from '../../../../../settings';

const {
  auth: {
    session,
    social: {
      facebook: { clientID, clientSecret, callbackURL, profileFields, enabled }
    }
  }
} = settings;

const beforeware = (app: Express) => {
  app.use(passport.initialize());
};

const onAppCreate = ({ appContext }: AuthModule) => {
  passport.use(
    new FacebookStrategy(
      { clientID, clientSecret, callbackURL, profileFields },
      appContext.social ? appContext.social.facebook.verifyCallback : undefined
    )
  );
};

export default (enabled && !__TEST__
  ? new AuthModule({
      beforeware: [beforeware],
      onAppCreate: [onAppCreate],
      apiRouteParams: [
        {
          method: RestMethod.GET,
          route: 'auth/facebook',
          controller: auth
        },
        {
          method: RestMethod.GET,
          route: 'auth/facebook/callback',
          middleware: [passport.authenticate('facebook', { session: session.enabled, failureRedirect: '/login' })],
          controller: onAuthenticationSuccess
        }
      ]
    })
  : undefined);
