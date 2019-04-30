import { AuthModule } from '@restapp/authentication-server-ts';
import facebook, { facebookData } from './facebook';
import github, { githubData } from './github';
import google, { googleData } from './google';

const social = {
  ...facebookData,
  ...githubData,
  ...googleData
};

export default new AuthModule(facebook, github, google, {
  appContext: { social }
});
