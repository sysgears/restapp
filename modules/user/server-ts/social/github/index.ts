import { pick } from 'lodash';
import { AuthModule } from '@restapp/authentication-server-ts';
import { onAuthenticationSuccess, registerUser, UserSocial } from '../shared';
import User from '../../sql';

import settings from '../../../../../settings';

const createGithubAuth = async (user: any) => User.createGithubAuth(user);

async function verifyCallback(accessToken: string, refreshToken: string, profile: UserSocial, cb: any) {
  const {
    id,
    displayName,
    emails: [{ value }]
  } = profile;

  try {
    let user: any = await User.getUserByGHIdOrEmail(id, value);

    if (!user) {
      const [createdUserId] = await registerUser(profile);
      await createGithubAuth({ id, displayName, userId: createdUserId });
      user = await User.getUser(createdUserId);
    } else if (!user.ghId) {
      await createGithubAuth({ id, displayName, userId: user.id });
    }

    return cb(null, pick(user, ['id', 'username', 'role', 'email']));
  } catch (err) {
    return cb(err, {});
  }
}

export const githubData = {
  github: {
    onAuthenticationSuccess,
    verifyCallback
  }
};

export default (settings.auth.social.github.enabled && !__TEST__ ? new AuthModule() : undefined);
