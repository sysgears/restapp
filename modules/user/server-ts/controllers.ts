import { pick, isEmpty } from 'lodash';
import jwt from 'jsonwebtoken';

import { createTransaction } from '@restapp/database-server-ts';
import { log } from '@restapp/core-common';
import { mailer } from '@restapp/mailer-server-ts';

import userDAO, { UserShape } from './sql';
import settings from '../../../settings';
import { ValidationErrors } from '.';
import { createPasswordHash } from './password';
import emailTemplate from './emailTemplate';

const {
  auth: { password, secret },
  app
} = settings;

export const user = async ({ params: { id }, user: identity, t }: any, res: any) => {
  if (+identity.id === +id || identity.role === 'admin') {
    try {
      res.json(await userDAO.getUser(id));
    } catch (e) {
      res.status(500).json({ errors: e });
    }
  } else {
    res.status(401).send(t('user:accessDenied'));
  }
};
export const users = async ({ body: { orderBy, filter }, user: identity, t }: any, res: any) => {
  identity.role === 'admin'
    ? res.json(await userDAO.getUsers(orderBy, filter))
    : res.status(401).send(t('user:accessDenied'));
};

export const currentUser = async ({ user: identity }: any, res: any) => {
  if (identity.id) {
    res.json(await userDAO.getUser(identity.id));
  } else {
    res.send(null);
  }
};

export const addUser = async ({ body, user: identity, t }: any, res: any) => {
  if (identity.role !== 'admin') {
    return res.status(401).send(t('user:accessDenied'));
  }
  const errors: ValidationErrors = {};

  const userExists = await userDAO.getUserByUsername(body.username);
  if (userExists) {
    errors.username = t('user:usernameIsExisted');
  }

  const emailExists = await userDAO.getUserByEmail(body.email);
  if (emailExists) {
    errors.email = t('user:emailIsExisted');
  }

  if (body.password.length < password.minLength) {
    errors.password = t('user:passwordLength');
  }

  if (!isEmpty(errors)) {
    return res.status(422).json({
      errors: {
        message: t('user:auth.password.registrationFailed'),
        ...errors
      }
    });
  }

  const passwordHash: string = await createPasswordHash(body.password);

  const trx = await createTransaction();
  let createdUserId;
  try {
    const isActive = password.requireEmailConfirmation ? body.isActive || false : !password.requireEmailConfirmation;

    [createdUserId] = await userDAO.register({ ...body, isActive }, passwordHash).transacting(trx);
    await userDAO.editUserProfile({ id: createdUserId, ...body }).transacting(trx);
    trx.commit();
  } catch (e) {
    res.status(500).json({
      errors: {
        message: e
      }
    });
    trx.rollback();
  }

  try {
    const createdUser = (await userDAO.getUser(createdUserId)) as UserShape;
    res.json(user);

    if (mailer && password.requireEmailConfirmation && !emailExists) {
      // async email
      jwt.sign({ identity: pick(createdUser, 'id') }, secret, { expiresIn: '1d' }, (err: any, emailToken: string) => {
        const encodedToken = Buffer.from(emailToken).toString('base64');
        const url = `${__WEBSITE_URL__}/confirmation/${encodedToken}`;
        mailer.sendMail({
          from: `${app.name} <${process.env.EMAIL_USER}>`,
          to: createdUser.email,
          subject: 'Your account has been created',
          html: emailTemplate.accountCreated(url, createdUser)
        });
        log.info(`Sent registration confirmation email to: ${createdUser.email}`);
      });
    }
  } catch (e) {
    res.status(500).json({
      errors: {
        message: e
      }
    });
  }
};

export const editUser = async ({ user: identity, body, t }: any, res: any) => {
  const isAdmin = () => identity.role === 'admin';
  const isSelf = () => +identity.id === +body.id;

  if (!isSelf() && !isAdmin()) {
    return res.status(401).send(t('user:accessDenied'));
  }

  const errors: ValidationErrors = {};

  const userExists = (await userDAO.getUserByUsername(body.username)) as UserShape;
  if (userExists && userExists.id !== body.id) {
    errors.username = t('user:usernameIsExisted');
  }

  const emailExists = (await userDAO.getUserByEmail(body.email)) as UserShape;
  if (emailExists && emailExists.id !== body.id) {
    errors.email = t('user:emailIsExisted');
  }

  if (body.password && body.password.length < password.minLength) {
    errors.password = t('user:passwordLength');
  }

  if (!isEmpty(errors)) {
    return res.status(422).json({
      errors: {
        message: t('user:auth.password.registrationFailed'),
        ...errors
      }
    });
  }

  const userInfo = !isSelf() && isAdmin() ? body : pick(body, ['id', 'username', 'email', 'password']);

  const isProfileExists = await userDAO.isUserProfileExists(body.id);
  const passwordHash = await createPasswordHash(body.password);

  const trx = await createTransaction();
  try {
    await userDAO.editUser(userInfo, passwordHash).transacting(trx);
    await userDAO.editUserProfile(body, isProfileExists).transacting(trx);

    if (mailer && body.password && password.sendPasswordChangesEmail) {
      const url = `${__WEBSITE_URL__}/profile`;

      mailer.sendMail({
        from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
        to: body.email,
        subject: 'Your Password Has Been Updated',
        html: emailTemplate.passwordUpdated(url)
      });
      log.info(`Sent password has been updated to: ${body.email}`);
    }
    trx.commit();
  } catch (e) {
    res.status(500).json({
      errors: {
        message: e
      }
    });
    trx.rollback();
  }

  try {
    res.json(await userDAO.getUser(body.id));
  } catch (e) {
    res.status(500).json({
      errors: {
        message: e
      }
    });
  }
};

export const deleteUser = async ({ user: identity, body: { id }, t }: any, res: any) => {
  const isAdmin = () => identity.role === 'admin';
  const isSelf = () => +identity.id === +id;

  const userData = await userDAO.getUser(id);
  if (!userData) {
    res.send(t('user:userIsNotExisted'));
  }

  if (isSelf()) {
    res.send(t('user:userCannotDeleteYourself'));
  }

  const isDeleted = !isSelf() && isAdmin() ? await userDAO.deleteUser(id) : false;

  if (isDeleted) {
    res.json(userData);
  } else {
    res.send(t('user:userCouldNotDeleted'));
  }
};
