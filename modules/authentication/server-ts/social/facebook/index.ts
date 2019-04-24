import { Express } from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import settings from '../../../../../settings';
import AuthModule from '../AuthModule';

const { clientID, clientSecret, callbackURL, profileFields, enabled } = settings.auth.social.facebook;

interface AppContext {
  social: any;
}

const middleware = (app: Express, appContext: AppContext) => {
  if (!enabled || __TEST__) {
    return false;
  }

  app.use(passport.initialize());

  app.get('/auth/facebook', (req, res, next) => {
    passport.authenticate('facebook', { state: req.query.expoUrl })(req, res, next);
  });

  // TODO: Should be fixed on th enext iteration
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
    appContext.social ? appContext.social.facebook.onAuthenticationSuccess : undefined
  );
};

// TODO: Should be fixed on th enext iteration
const onAppCreate = ({ appContext }: AuthModule) => {
  if (enabled && !__TEST__) {
    passport.use(
      new FacebookStrategy(
        { clientID, clientSecret, callbackURL, profileFields },
        appContext.social ? appContext.social.facebook.verifyCallback : undefined
      )
    );
  }
};

export default new AuthModule({
  middleware: [middleware],
  onAppCreate: [onAppCreate]
});
