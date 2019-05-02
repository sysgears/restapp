import bcrypt from 'bcryptjs';

import ServerModule, { RestMethod } from '@restapp/module-server-ts';

import { user, users, currentUser, addUser, editUser, deleteUser } from './controllers';
import password from './password';
import social from './social';
import User from './sql';
import settings from '../../../settings';
import resources from './locales';

export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
}

const getIdentity = (id: number) => {
  return User.getUser(id);
};

// TODO add type of user
const getHash = async (id: number) => ((await User.getUserWithPassword(id)) as any).passwordHash || '';

// TODO find a way to provide translate function
const validateLogin = async (usernameOrEmail: string, pswd: string) => {
  // TODO add type of user
  const identity: any = await User.getUserByUsernameOrEmail(usernameOrEmail);
  if (!user) {
    return { message: 'user:auth.password.validPasswordEmail' };
  }

  if (settings.auth.password.requireEmailConfirmation && !identity.isActive) {
    return { message: 'user:auth.password.emailConfirmation' };
  }

  const valid = await bcrypt.compare(pswd, identity.passwordHash);
  if (!valid) {
    return { message: 'user:auth.password.validPassword' };
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
      middleware: [user]
    },
    {
      method: RestMethod.GET,
      route: 'users',
      isAuthRoute: true,
      middleware: [users]
    },
    {
      method: RestMethod.GET,
      route: 'currentUser',
      isAuthRoute: true,
      middleware: [currentUser]
    },
    {
      method: RestMethod.POST,
      route: 'addUser',
      isAuthRoute: true,
      middleware: [addUser]
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
