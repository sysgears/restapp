import { UserShape } from './../sql';
import { pick, isEmpty } from 'lodash';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { access } from '@restapp/authentication-server-ts';
import { log } from '@restapp/core-common';
import { mailer } from '@restapp/mailer-server-ts';

import userDAO from '../sql';
import settings from '../../../../settings';
import { ValidationErrors } from '../index';
import emailTemplate from '../emailTemplate';
import { createPasswordHash } from '.';

const {
  auth: { session, jwt: jwtSetting, password, secret },
  app
} = settings;

export const login = (req: any, res: any) => {
  passport.authenticate('local', { session: session.enabled }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user
      });
    }

    req.login(user, { session: session.enabled }, async (loginErr: any) => {
      if (loginErr) {
        res.send(loginErr);
      }
      const tokens = jwtSetting.enabled ? await access.grantAccess(user, req, user.passwordHash) : null;

      return res.json({ user, tokens });
    });
  })(req, res);
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
    return res.send({
      message: 'Failed reset password',
      errors
    });
  }

  let userId = 0;
  if (!emailExists) {
    const passwordHash = await createPasswordHash(body.password);
    const isActive = !password.requireEmailConfirmation;
    [userId] = await userDAO.register({ ...body, isActive }, passwordHash);

    // if user has previously logged with facebook auth
  } else {
    await userDAO.updatePassword(emailExists.userId, body.password);
    userId = emailExists.userId;
  }

  const user = (await userDAO.getUser(userId)) as UserShape;

  if (mailer && password.requireEmailConfirmation && !emailExists) {
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
    const identity = (await userDAO.getUserByEmail(localAuth.email)) as UserShape;

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

  if (reset.password.length < password.minLength) {
    errors.password = t('user:auth.password.passwordLength', { length: password.minLength });
  }

  if (!isEmpty(errors)) {
    return res.send({
      message: 'Failed reset password',
      errors
    });
  }

  const token = Buffer.from(reset.token, 'base64').toString();
  const { email, passwordHash } = jwt.verify(token, secret) as UserShape;
  const identity = (await userDAO.getUserByEmail(email)) as UserShape;

  if (identity.passwordHash !== passwordHash) {
    throw res.status(401).send(t('user:auth.password.invalidToken'));
  }

  if (identity) {
    await userDAO.updatePassword(identity.id, reset.password);
    const url = `${__WEBSITE_URL__}/profile`;
    res.send(t('user:auth.password.resestPassword'));

    if (mailer && password.sendPasswordChangesEmail) {
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
