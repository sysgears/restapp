import ServerModule, { RestMethod } from '@restapp/module-server-ts';
import { login, currentUser, createUser, editUser, deleteUser } from './controllers';

export const ref: { module: ServerModule } = {
  module: null
};

export default new ServerModule({
  onAppCreate: [(module: ServerModule) => (ref.module = module)],
  apiRouteParams: [
    {
      method: RestMethod.POST,
      route: 'login',
      middleware: [login]
    },
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
