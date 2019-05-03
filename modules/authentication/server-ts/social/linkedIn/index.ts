import { Express } from 'express';
import passport from 'passport';
import { Strategy as LinkedInStrategy } from '@sokratis/passport-linkedin-oauth2';

import { RestMethod } from '@restapp/module-server-ts';

import { auth, onAuthenticationSuccess } from './controllers';
import AuthModule from '../AuthModule';
import settings from '../../../../../settings';

const {
  auth: {
    session,
    social: {
      linkedin: { clientID, clientSecret, callbackURL, enabled, scope }
    }
  }
} = settings;

const beforeware = (app: Express) => {
  app.use(passport.initialize());
};

const onAppCreate = ({ appContext }: AuthModule) => {
  passport.use(
    new LinkedInStrategy(
      { clientID, clientSecret, callbackURL, scopeSeparator: scope },
      appContext.social ? appContext.social.linkedin.verifyCallback : undefined
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
          route: 'auth/linkedin',
          controller: [auth]
        },
        {
          method: RestMethod.GET,
          route: 'auth/linkedin/callback',
          controller: [
            passport.authenticate('linkedin', { session: session.enabled, failureRedirect: '/login' }),
            onAuthenticationSuccess
          ]
        }
      ]
    })
  : undefined);
