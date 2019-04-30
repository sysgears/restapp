import { Express } from 'express';
import passport from 'passport';
import { Strategy as LinkedInStrategy } from '@sokratis/passport-linkedin-oauth2';
import settings from '../../../../../settings';
import AuthModule from '../AuthModule';

const { clientID, clientSecret, callbackURL, enabled } = settings.auth.social.linkedin;

interface AppContext {
  social: any;
}

const middleware = (app: Express, appContext: AppContext) => {
  if (!enabled || __TEST__) {
    return false;
  }

  app.use(passport.initialize());

  app.get('/auth/linkedin', (req, res, next) => {
    passport.authenticate('linkedin', { state: req.query.expoUrl })(req, res, next);
  });

  // TODO: Should be fixed on th enext iteration
  app.get(
    '/auth/linkedin/callback',
    passport.authenticate('linkedin', { session: false, failureRedirect: '/login' }),
    appContext.social ? appContext.social.linkedin.onAuthenticationSuccess : undefined
  );
};

// TODO: Should be fixed on th enext iteration
const onAppCreate = ({ appContext }: AuthModule) => {
  if (enabled && !__TEST__) {
    passport.use(
      new LinkedInStrategy(
        { clientID, clientSecret, callbackURL },
        appContext.social ? appContext.social.linkedin.verifyCallback : undefined
      )
    );
  }
};

export default new AuthModule({
  middleware: [middleware],
  onAppCreate: [onAppCreate]
});
