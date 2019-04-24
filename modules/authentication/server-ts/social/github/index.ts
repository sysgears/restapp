import { Express } from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import settings from '../../../../../settings';
import AuthModule from '../AuthModule';

const { clientID, clientSecret, scope, callbackURL, enabled } = settings.auth.social.github;

interface AppContext {
  social: any;
}

const middleware = (app: Express, appContext: AppContext) => {
  if (!enabled || __TEST__) {
    return false;
  }

  app.use(passport.initialize());

  app.get('/auth/github', (req, res, next) => {
    passport.authenticate('github', { state: req.query.expoUrl })(req, res, next);
  });

  // TODO: Should be fixed on th enext iteration
  app.get(
    '/auth/github/callback',
    passport.authenticate('github', { session: false, failureRedirect: '/login' }),
    appContext.social ? appContext.social.github.onAuthenticationSuccess : undefined
  );
};

// TODO: Should be fixed on th enext iteration
const onAppCreate = ({ appContext }: AuthModule) => {
  if (enabled && !__TEST__) {
    passport.use(
      new GitHubStrategy(
        { clientID, clientSecret, scope, callbackURL },
        appContext.social ? appContext.social.github.verifyCallback : undefined
      )
    );
  }
};

export default new AuthModule({
  middleware: [middleware],
  onAppCreate: [onAppCreate]
});
