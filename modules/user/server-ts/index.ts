import bcrypt from 'bcryptjs';

import ServerModule, { RestMethod } from '@restapp/module-server-ts';

import { currentUser, createUser, editUser, deleteUser } from './controllers';
import password from './password';
import User from './sql';
import settings from '../../../settings';

const getIdentity = (id: number) => {
  return User.getUser(id);
};

// TODO add type of user
const getHash = async (id: number) => ((await User.getUserWithPassword(id)) as any).passwordHash || '';

const validateLogin = async (usernameOrEmail: string, pswd: string, t: any) => {
  // TODO add type of user
  const user: any = await User.getUserByUsernameOrEmail(usernameOrEmail);

  if (!user) {
    // user with provided email not found
    return { message: t('user:auth.password.validPasswordEmail') };
  }

  if (settings.auth.password.requireEmailConfirmation && !user.isActive) {
    return { message: t('user:auth.password.emailConfirmation') };
  }

  const valid = await bcrypt.compare(pswd, user.passwordHash);
  if (!valid) {
    return { message: t('user:auth.password.validPassword') };
  }
  return { idenity: user };
};

const appContext = {
  getIdentity,
  getHash,
  validateLogin
};

export default new ServerModule(password, {
  appContext,
  apiRouteParams: [
    {
      method: RestMethod.GET,
      route: 'currentUser',
      isAuthRoute: true,
      middleware: [currentUser]
    },
    {
      method: RestMethod.POST,
      route: 'createUser',
      isAuthRoute: true,
      middleware: [createUser]
    },
    {
      method: RestMethod.POST,
      route: 'editUser',
      isAuthRoute: true,
      middleware: [editUser]
    },
    {
      method: RestMethod.DELETE,
      route: 'deleteUser',
      isAuthRoute: true,
      middleware: [deleteUser]
    }
  ]
});
