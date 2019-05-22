import { UserShape, UserShapePassword } from './../sql';
import { pick, isEmpty } from 'lodash';
import jwt from 'jsonwebtoken';
import { log } from '@restapp/core-common';
import { mailer } from '@restapp/mailer-server-ts';

import userDAO from '../sql';
import settings from '../../../../settings';
import { ValidationErrors } from '../';
import emailTemplate from '../emailTemplate';
import { createPasswordHash } from '.';

const {
  auth: { password: passwordSettings, secret },
  app
} = settings;

export const login = async (req: any, res: any, next: any) => {
  const {
    locals: { appContext }
  } = res;
  const { usernameOrEmail, password } = req.body;

  appContext.auth && appContext.auth.loginMiddleware
    ? res.locals.appContext.auth.loginMiddleware(req, res, next)
    : res.json(await appContext.user.validateLogin(usernameOrEmail, password));
};

export const register = async ({ body, t }: any, res: any) => {
  const errors: ValidationErrors = {};
  const userExists = await userDAO.getUserByUsername(body.username);
  if (userExists) {
    errors.username = t('user:auth.password.usernameIsExisted');
  }

  const emailExists = (await userDAO.getUserByEmail(body.email)) as UserShape;
  if (emailExists) {
    errors.email = t('user:auth.password.emailIsExisted');
  }

  if (!isEmpty(errors)) {
    return res.status(422).send({
      errors: {
        message: t('user:auth.password.registrationFailed'),
        ...errors
      }
    });
  }

  let userId = 0;
  if (!emailExists) {
    const passwordHash = await createPasswordHash(body.password);
    const isActive = !passwordSettings.requireEmailConfirmation;
    [userId] = await userDAO.register({ ...body, isActive }, passwordHash);

    // if user has previously logged with facebook auth
  } else {
    await userDAO.updatePassword(emailExists.userId, body.password);
    userId = emailExists.userId;
  }

  const user = (await userDAO.getUser(userId)) as UserShape;

  if (mailer && passwordSettings.requireEmailConfirmation && !emailExists) {
    // async email
    jwt.sign({ identity: pick(user, 'id') }, secret, { expiresIn: '1d' }, (err, emailToken) => {
      const encodedToken = Buffer.from(emailToken).toString('base64');
      const url = `${__WEBSITE_URL__}/confirmation/${encodedToken}`;
      mailer.sendMail({
        from: `${app.name} <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Confirm Email',
        html: emailTemplate.confirmEmail(url, user)
      });
      log.info(`Sent registration confirmation email to: ${user.email}`);
    });
  }

  res.json(user);
};

export const forgotPassword = async ({ body, t }: any, res: any) => {
  try {
    const localAuth = pick(body, 'email');
    const identity = (await userDAO.getUserByEmail(localAuth.email)) as UserShapePassword;

    if (identity && mailer) {
      // async email
      jwt.sign(
        { email: identity.email, passwordHash: identity.passwordHash },
        secret,
        { expiresIn: '1d' },
        (err, emailToken) => {
          // encoded token since react router does not match dots in params
          const encodedToken = Buffer.from(emailToken).toString('base64');
          const url = `${__WEBSITE_URL__}/reset-password/${encodedToken}`;
          mailer.sendMail({
            from: `${app.name} <${process.env.EMAIL_USER}>`,
            to: identity.email,
            subject: 'Reset Password',
            html: emailTemplate.passwordReset(url)
          });
          log.info(`Sent link to reset email to: ${identity.email}`);
        }
      );
      res.send(t('user:auth.password.forgotPassword'));
    }
  } catch (e) {
    res.send(e);
  }
};

export const resetPassword = async ({ body, t }: any, res: any) => {
  const errors: ValidationErrors = {};
  const reset = pick(body, ['password', 'passwordConfirmation', 'token']);

  if (reset.password !== reset.passwordConfirmation) {
    errors.password = t('user:auth.password.passwordsIsNotMatch');
  }

  if (reset.password.length < passwordSettings.minLength) {
    errors.password = t('user:auth.password.passwordLength', { length: passwordSettings.minLength });
  }

  if (!isEmpty(errors)) {
    return res.status(422).send({
      message: 'Failed reset password',
      ...errors
    });
  }

  const token = Buffer.from(reset.token, 'base64').toString();
  const { email, passwordHash } = jwt.verify(token, secret) as UserShapePassword;
  const identity = (await userDAO.getUserByEmail(email)) as UserShapePassword;

  if (identity.passwordHash !== passwordHash) {
    throw res.status(401).send(t('user:auth.password.invalidToken'));
  }

  if (identity) {
    await userDAO.updatePassword(identity.id, reset.password);
    const url = `${__WEBSITE_URL__}/profile`;
    res.send(t('user:auth.password.resestPassword'));

    if (mailer && passwordSettings.sendPasswordChangesEmail) {
      mailer.sendMail({
        from: `${app.name} <${process.env.EMAIL_USER}>`,
        to: identity.email,
        subject: 'Your Password Has Been Updated',
        html: emailTemplate.passwordUpdated(url)
      });
      log.info(`Sent password has been updated to: ${identity.email}`);
    }
  }
};
