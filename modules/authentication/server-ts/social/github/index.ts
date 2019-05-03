import { Express } from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';

import { RestMethod } from '@restapp/module-server-ts';

import { auth, onAuthenticationSuccess } from './controllers';
import settings from '../../../../../settings';
import AuthModule from '../AuthModule';

const {
  auth: {
    session,
    social: {
      github: { clientID, clientSecret, scope, callbackURL, enabled }
    }
  }
} = settings;

const beforeware = (app: Express) => {
  app.use(passport.initialize());
};

const onAppCreate = ({ appContext }: AuthModule) => {
  passport.use(
    new GitHubStrategy(
      { clientID, clientSecret, scope, callbackURL },
      appContext.social ? appContext.social.github.verifyCallback : undefined
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
          route: 'auth/github',
          controller: [auth]
        },
        {
          method: RestMethod.GET,
          route: 'auth/github/callback',
          middleware: [passport.authenticate('github', { session: session.enabled, failureRedirect: '/login' })],
          controller: [onAuthenticationSuccess]
        }
      ]
    })
  : undefined);
