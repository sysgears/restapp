import passport from 'passport';

export const auth = (req: any, res: any) => {
  passport.authenticate('linkedin', { state: req.query.expoUrl })(req, res);
};

export const onAuthenticationSuccess = (req: any, res: any) => {
  const {
    locals: { appContext }
  } = res;
  const { t } = req;
  appContext.social
    ? appContext.social.google.onAuthenticationSuccess(req, res)
    : res.status(500).send(t('auth:social'));
};