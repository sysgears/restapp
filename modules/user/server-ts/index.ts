import ServerModule, { RestMethod } from '@restapp/module-server-ts';
import { login } from './controllers';

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
      method: RestMethod.POST,
      route: 'auth',
      isAuthRoute: true,
      middleware: [(req, res) => res.send('user is logged in')]
    }
  ]
});
