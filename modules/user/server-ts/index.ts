import ServerModule, { RestMethod } from '@restapp/module-server-ts';

import { currentUser, createUser, editUser, deleteUser } from './controllers';
import password from './password';
import User from './sql';

const getIdentity = (id: number) => {
  return User.getUser(id);
};

const getHash = async (id: number) => (await User.getUserWithPassword(id)).passwordHash || '';

const appContext = {
  getIdentity,
  getHash
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
