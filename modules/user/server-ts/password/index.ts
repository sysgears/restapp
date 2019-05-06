import bcrypt from 'bcryptjs';

import { AuthModule } from '@restapp/authentication-server-ts';
import { RestMethod } from '@restapp/module-server-ts';

import { login, register, forgotPassword, resetPassword } from './controllers';
import settings from '../../../../settings';

export const createPasswordHash = (pswd: string) => bcrypt.hash(pswd, 12);

export default (settings.auth.password.enabled
  ? new AuthModule({
      apiRouteParams: [
        {
          method: RestMethod.POST,
          route: 'login',
          controller: login
        },
        {
          method: RestMethod.POST,
          route: 'register',
          controller: register
        },
        {
          method: RestMethod.POST,
          route: 'forgotPassword',
          controller: forgotPassword
        },
        {
          method: RestMethod.POST,
          route: 'resetPassword',
          controller: resetPassword
        }
      ]
    })
  : undefined);
