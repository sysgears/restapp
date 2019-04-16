import ServerModule, { RestMethod } from '@restapp/module-server-ts';
import { login } from './controllers';

export default new ServerModule({
  apiRouteParams: [
    {
      method: RestMethod.POST,
      route: 'login',
      middleware: [login]
    }
  ]
});
