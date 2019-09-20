import { AuthModule } from '@restapp/authentication-server-ts';
import facebook, { facebookData } from './facebook';
import github, { githubData } from './github';
import google, { googleData } from './google';
import linkedin, { linkedinData } from './linkedIn';

const social = {
  ...facebookData,
  ...githubData,
  ...googleData,
  ...linkedinData
};

export default new AuthModule(facebook, github, google, linkedin, {
  appContext: { social }
});
