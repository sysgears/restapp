import { AuthModule } from '@restapp/authentication-server-ts';
import facebook, { facebookData } from './facebook';

const social = {
  ...facebookData
};

export default new AuthModule(facebook, {
  appContext: { social }
});
