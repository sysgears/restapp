import { Express } from 'express';
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import settings from '../../../../../settings';
import AuthModule from '../AuthModule';

const { clientID, clientSecret, scope, callbackURL, enabled } = settings.auth.social.google;

interface AppContext {
  social: any;
}

const middleware = (app: Express, appContext: AppContext) => {
  if (!enabled || __TEST__) {
    return false;
  }

  app.use(passport.initialize());

  app.get('/auth/google', (req, res, next) => {
    passport.authenticate('google', { scope, state: req.query.expoUrl })(req, res, next);
  });

  // TODO: Should be fixed on th enext iteration
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    appContext.social ? appContext.social.google.onAuthenticationSuccess : undefined
  );
};

// TODO: Should be fixed on th enext iteration
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

export default new AuthModule({
  middleware: [middleware],
  onAppCreate: [onAppCreate]
});
