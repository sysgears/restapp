import { Express } from 'express';
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import { RestMethod } from '@restapp/module-server-ts';

import { auth, onAuthenticationSuccess } from './controllers';
import AuthModule from '../AuthModule';
import settings from '../../../../../settings';

const {
  auth: {
    session,
    social: {
      google: { clientID, clientSecret, callbackURL, enabled }
    }
  }
} = settings;

const beforeware = (app: Express) => {
  app.use(passport.initialize());
};

const onAppCreate = ({ appContext }: AuthModule) => {
  if (enabled && !__TEST__) {
    passport.use(
      new GoogleStrategy(
        { clientID, clientSecret, callbackURL },
        appContext.social ? appContext.social.google.verifyCallback : undefined
      )
    );
  }
};

export default (enabled && !__TEST__
  ? new AuthModule({
      beforeware: [beforeware],
      onAppCreate: [onAppCreate],
      apiRouteParams: [
        {
          method: RestMethod.GET,
          route: 'auth/google',
          controller: [auth]
        },
        {
          method: RestMethod.GET,
          route: 'auth/google/callback',
          middleware: [passport.authenticate('google', { session: session.enabled, failureRedirect: '/login' })],
          controller: [onAuthenticationSuccess]
        }
      ]
    })
  : undefined);
