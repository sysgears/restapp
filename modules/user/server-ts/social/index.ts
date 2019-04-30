import { AuthModule } from '@restapp/authentication-server-ts';
import facebook, { facebookData } from './facebook';
import github, { githubData } from './github';

const social = {
  ...facebookData,
  ...githubData
};

export default new AuthModule(facebook, github, {
  appContext: { social }
});
