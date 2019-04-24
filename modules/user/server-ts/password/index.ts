import { AuthModule } from '@restapp/authentication-server-ts';
import { RestMethod } from '@restapp/module-server-ts';

import { login } from './controllers';
import settings from '../../../../settings';

export default (settings.auth.password.enabled
  ? new AuthModule({
      apiRouteParams: [
        {
          method: RestMethod.POST,
          route: 'login',
          middleware: [login]
        }
      ]
    })
  : undefined);
