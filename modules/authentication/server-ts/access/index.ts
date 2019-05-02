import jwt from './jwt';
import session from './session';
import resources from '../locales';

import AccessModule from './AccessModule';

export interface UserShape {
  id: number;
  username: string;
  role: string;
  isActive: boolean;
  email: string;
  passwordHash: string;
}

// Try to grant access via sessions first, and if that fails, then try using JWT
// This way if both JWT and sessions enabled UI won't have to refresh access tokens
export default new AccessModule(session, jwt, {
  localization: [{ ns: 'auth', resources }]
});
