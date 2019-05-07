import ServerModule from '@restapp/module-server-ts';
import password from './password';

import resources from './locales';

export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
}

export default new ServerModule(password, { localization: [{ ns: 'user', resources }] });
