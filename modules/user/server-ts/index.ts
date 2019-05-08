import bcrypt from 'bcryptjs';
import i18n from 'i18next';

import ServerModule from '@restapp/module-server-ts';

import password from './password';
import UserDAO, { UserShape } from './sql';
import settings from '../../../settings';
import resources from './locales';

export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
}

const getIdentity = (id: number) => {
  return UserDAO.getUser(id);
};

const getHash = async (id: number) => ((await UserDAO.getUserWithPassword(id)) as UserShape).passwordHash || '';

const validateLogin = async (usernameOrEmail: string, pswd: string) => {
  const identity = (await UserDAO.getUserByUsernameOrEmail(usernameOrEmail)) as UserShape;

  if (!identity) {
    return { message: i18n.t('user:auth.password.validPasswordEmail') };
  }

  if (settings.auth.password.requireEmailConfirmation && !identity.isActive) {
    return { message: i18n.t('user:auth.password.emailConfirmation') };
  }

  const valid = await bcrypt.compare(pswd, identity.passwordHash);
  if (!valid) {
    return { message: i18n.t('user:auth.password.validPassword') };
  }

  return { identity };
};

const appContext = {
  user: {
    getIdentity,
    getHash,
    validateLogin
  }
};

export default new ServerModule(password, {
  appContext,
  localization: [{ ns: 'user', resources }]
});
