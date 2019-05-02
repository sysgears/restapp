import bcrypt from 'bcryptjs';
import i18n from 'i18next';

import ServerModule, { RestMethod } from '@restapp/module-server-ts';

import { user, users, currentUser, addUser, editUser, deleteUser } from './controllers';
import password from './password';
import social from './social';
import UserDAO, { UserShape } from './sql';
import settings from '../../../settings';
import resources from './locales';

export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
}

export const createPasswordHash = (pswd: string) => bcrypt.hash(pswd, 12);

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

export default new ServerModule(password, social, {
  appContext,
  localization: [{ ns: 'user', resources }],
  apiRouteParams: [
    {
      method: RestMethod.GET,
      route: 'user',
      isAuthRoute: true,
      controller: [user]
    },
    {
      method: RestMethod.GET,
      route: 'users',
      isAuthRoute: true,
      controller: [users]
    },
    {
      method: RestMethod.GET,
      route: 'currentUser',
      isAuthRoute: true,
      controller: [currentUser]
    },
    {
      method: RestMethod.POST,
      route: 'addUser',
      isAuthRoute: true,
      controller: [addUser]
    },
    {
      method: RestMethod.POST,
      route: 'editUser',
      isAuthRoute: true,
      controller: [editUser]
    },
    {
      method: RestMethod.DELETE,
      route: 'deleteUser',
      isAuthRoute: true,
      controller: [deleteUser]
    }
  ]
});
