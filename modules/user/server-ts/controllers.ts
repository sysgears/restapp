import { Request, Response } from 'express';
import passport from 'passport';
import { pick, isEmpty } from 'lodash';
import bcrypt from 'bcryptjs';

import { createTransaction } from '@restapp/database-server-ts';
import { log } from '@restapp/core-common';
import { mailer } from '@restapp/mailer-server-ts';
import { access } from '@restapp/authentication-server-ts';

import User from './sql';
import settings from '../../../settings';

const {
  auth: { session, jwt, password, secret },
  app
} = settings;

const createPasswordHash = (pswd: string) => {
  return bcrypt.hash(pswd, 12);
};

export const login = (req: Request, res: Response) => {
  passport.authenticate('local', { session: session.enabled }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user
      });
    }

    req.login(user, { session: session.enabled }, async loginErr => {
      if (loginErr) {
        res.send(loginErr);
      }
      const [accessToken, refreshToken] = jwt.enabled ? await access.grantAccess(user, req, user.passwordHash) : null;

      return res.json({ user, accessToken, refreshToken });
    });
  })(req, res);
};

export const currentUser = async ({ user }: Request, res: Response) => {
  if (user.id) {
    res.json(await User.getUser(user.id));
  } else {
    res.send(null);
  }
};

export const createUser = async ({ body }: Request, res: Response) => {
  const errors: any = {};

  const userExists = await User.getUserByUsername(body.username);
  if (userExists) {
    errors.username = 'user:usernameIsExisted';
  }

  const emailExists = await User.getUserByEmail(body.email);
  if (emailExists) {
    errors.email = 'user:emailIsExisted';
  }

  if (body.password.length < password.minLength) {
    errors.password = 'user:passwordLength';
  }

  if (!isEmpty(errors)) {
    res.status(422).json({
      message: 'Failed to get events due to validation errors',
      errors
    });
  }

  const passwordHash: string = await createPasswordHash(body.password);

  const trx = await createTransaction();
  let createdUserId;
  try {
    const isActive = password.requireEmailConfirmation ? body.isActive || false : !password.requireEmailConfirmation;

    [createdUserId] = await User.register({ ...body, isActive }, passwordHash).transacting(trx);
    await User.editUserProfile({ id: createdUserId, ...body }).transacting(trx);
    trx.commit();
  } catch (e) {
    res.send(e);
    trx.rollback();
  }

  try {
    const user: any = await User.getUser(createdUserId);
    res.json(user);

    if (mailer && password.requireEmailConfirmation && !emailExists) {
      // async email
      jwt.sign({ identity: pick(user, 'id') }, secret, { expiresIn: '1d' }, (err: any, emailToken: string) => {
        const encodedToken = Buffer.from(emailToken).toString('base64');
        const url = `${__WEBSITE_URL__}/confirmation/${encodedToken}`;
        mailer.sendMail({
          from: `${app.name} <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: 'Your account has been created',
          html: `<p>Hi, ${user.username}!</p>
                <p>Welcome to ${app.name}. Please click the following link to confirm your email:</p>
                <p><a href="${url}">${url}</a></p>
                <p>Below are your login information</p>
                <p>Your email is: ${user.email}</p>`
        });
        log.info(`Sent registration confirmation email to: ${user.email}`);
      });
    }
  } catch (e) {
    res.json(e);
  }
};

export const editUser = async ({ user, body }: Request, res: Response) => {
  const isAdmin = () => user.role === 'admin';
  const isSelf = () => user.id === body.id;

  const errors: any = {};

  const userExists: any = await User.getUserByUsername(body.username);
  if (userExists && userExists.id !== body.id) {
    errors.username = 'user:usernameIsExisted';
  }

  const emailExists: any = await User.getUserByEmail(body.email);
  if (emailExists && emailExists.id !== body.id) {
    errors.email = 'user:emailIsExisted';
  }

  if (body.password && body.password.length < password.minLength) {
    errors.password = 'user:passwordLength';
  }

  if (!isEmpty(errors)) {
    res.status(422).json({
      message: 'Failed to get events due to validation errors',
      errors
    });
  }

  const userInfo = !isSelf() && isAdmin() ? body : pick(body, ['id', 'username', 'email', 'password']);

  const isProfileExists = await User.isUserProfileExists(body.id);
  const passwordHash = await createPasswordHash(body.password);

  const trx = await createTransaction();
  try {
    await User.editUser(userInfo, passwordHash).transacting(trx);
    await User.editUserProfile(body, isProfileExists).transacting(trx);

    if (mailer && body.password && password.sendPasswordChangesEmail) {
      const url = `${__WEBSITE_URL__}/profile`;

      mailer.sendMail({
        from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
        to: body.email,
        subject: 'Your Password Has Been Updated',
        html: `<p>Your account password has been updated.</p>
                     <p>To view or edit your account settings, please visit the “Profile” page at</p>
                     <p><a href="${url}">${url}</a></p>`
      });
      log.info(`Sent password has been updated to: ${body.email}`);
    }
    trx.commit();
  } catch (e) {
    res.json(e);
    trx.rollback();
  }

  try {
    res.json(await User.getUser(body.id));
  } catch (e) {
    throw e;
  }
};

export const deleteUser = async ({ user, body: { id } }: Request, res: Response) => {
  const isAdmin = () => user.role === 'admin';
  const isSelf = () => user.id === id;

  const userData = await User.getUser(id);
  if (!userData) {
    res.send('user:userIsNotExisted');
  }

  if (isSelf()) {
    res.send('user:userCannotDeleteYourself');
  }

  const isDeleted = !isSelf() && isAdmin() ? await User.deleteUser(id) : false;

  if (isDeleted) {
    res.json(userData);
  } else {
    res.send('user:userCouldNotDeleted');
  }
};
