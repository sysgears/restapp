import bcrypt from 'bcryptjs';
import { pick, isEmpty } from 'lodash';
import jwt from 'jsonwebtoken';
import passport from 'passport';
// import { UserInputError } from 'apollo-server-errors';
import { access } from '@restapp/authentication-server-ts';
import { log } from '@restapp/core-common';
import { mailer } from '@restapp/mailer-server-ts';

import User from '../sql';
import settings from '../../../../settings';

const {
  auth: { session, jwt: jwtSetting, password, secret }
} = settings;

const createPasswordHash = (pswd: string) => bcrypt.hash(pswd, 12) || false;

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
      const [accessToken, refreshToken] = jwtSetting.enabled
        ? await access.grantAccess(user, req, user.passwordHash)
        : null;

      return res.json({ user, accessToken, refreshToken });
    });
  })(req, res);
};

export const register = async ({ body, t }: any, res: any) => {
  const errors: any = {};
  const userExists = await User.getUserByUsername(body.username);
  if (userExists) {
    errors.username = t('user:auth.password.usernameIsExisted');
  }

  // TODO add type of user
  const emailExists: any = await User.getUserByEmail(body.email);
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
    [userId] = await User.register({ ...body, isActive }, passwordHash);

    // if user has previously logged with facebook auth
  } else {
    await User.updatePassword(emailExists.userId, body.password);
    userId = emailExists.userId;
  }

  // TODO add type of user
  const user: any = await User.getUser(userId);

  if (mailer && settings.auth.password.requireEmailConfirmation && !emailExists) {
    // async email
    jwt.sign({ identity: pick(user, 'id') }, settings.auth.secret, { expiresIn: '1d' }, (err, emailToken) => {
      const encodedToken = Buffer.from(emailToken).toString('base64');
      const url = `${__WEBSITE_URL__}/confirmation/${encodedToken}`;
      mailer.sendMail({
        from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Confirm Email',
        html: `<p>Hi, ${user.username}!</p>
              <p>Welcome to ${settings.app.name}. Please click the following link to confirm your email:</p>
              <p><a href="${url}">${url}</a></p>
              <p>Below are your login information</p>
              <p>Your email is: ${user.email}</p>`
      });
      log.info(`Sent registration confirmation email to: ${user.email}`);
    });
  }

  res.json(user);
};

export const forgotPassword = async ({ body }: any, res: any) => {
  try {
    const localAuth = pick(body, 'email');
    // TODO add type of user
    const user: any = await User.getUserByEmail(localAuth.email);

    if (user && mailer) {
      // async email
      jwt.sign({ email: user.email, password: user.passwordHash }, secret, { expiresIn: '1d' }, (err, emailToken) => {
        // encoded token since react router does not match dots in params
        const encodedToken = Buffer.from(emailToken).toString('base64');
        const url = `${__WEBSITE_URL__}/reset-password/${encodedToken}`;
        mailer.sendMail({
          from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: 'Reset Password',
          html: `Please click this link to reset your password: <a href="${url}">${url}</a>`
        });
        log.info(`Sent link to reset email to: ${user.email}`);
      });
    }
  } catch (e) {
    res.send(e);
  }
};

export const resetPassword = async ({ body, identity, t }: any, res: any) => {
  const errors: any = {};

  const reset = pick(body, ['password', 'passwordConfirmation', 'token']);
  if (reset.password !== reset.passwordConfirmation) {
    errors.password = t('user:auth.password.passwordsIsNotMatch');
  }

  if (reset.password.length < settings.auth.password.minLength) {
    errors.password = t('user:auth.password.passwordLength', { length: settings.auth.password.minLength });
  }

  if (!isEmpty(errors)) {
    return res.send({
      message: 'Failed reset password',
      errors
    });
  }

  const { email, pswd } = identity;
  // TODO add type of user
  const user: any = await User.getUserByEmail(email);
  if (user.passwordHash !== pswd) {
    throw new Error(t('user:auth.password.invalidToken'));
  }
  if (user) {
    await User.updatePassword(user.id, reset.password);
    const url = `${__WEBSITE_URL__}/profile`;

    if (mailer && settings.auth.password.sendPasswordChangesEmail) {
      mailer.sendMail({
        from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Your Password Has Been Updated',
        html: `<p>As you requested, your account password has been updated.</p>
                   <p>To view or edit your account settings, please visit the “Profile” page at</p>
                   <p><a href="${url}">${url}</a></p>`
      });
      log.info(`Sent password has been updated to: ${user.email}`);
    }
  }
};
