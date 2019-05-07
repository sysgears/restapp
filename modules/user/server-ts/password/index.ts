import bcrypt from 'bcryptjs';

import ServerModule, { RestMethod } from '@restapp/module-server-ts';

import { register, login } from './controllers';
import settings from '../../../../settings';

export const createPasswordHash = (pswd: string) => bcrypt.hash(pswd, 12);

export default (settings.auth.password.enabled
  ? new ServerModule({
      apiRouteParams: [
        {
          method: RestMethod.POST,
          route: 'register',
          controller: register
        },
        {
          method: RestMethod.POST,
          route: 'login',
          controller: login
        }
      ]
    })
  : undefined);