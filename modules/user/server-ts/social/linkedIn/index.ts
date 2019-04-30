import { pick } from 'lodash';
import { AuthModule } from '@restapp/authentication-server-ts';
import { onAuthenticationSuccess, registerUser, UserSocial } from '../shared';
import User from '../../sql';
import settings from '../../../../../settings';

const createLinkedInAuth = async (user: any) => User.createLinkedInAuth(user);

async function verifyCallback(accessToken: string, refreshToken: string, profile: UserSocial, cb: any) {
  const { id, displayName } = profile;
  try {
    let user: any = await User.getUserByLnInIdOrEmail(id);

    if (!user) {
      const [createdUserId] = await registerUser(profile);
      await createLinkedInAuth({ id, displayName, userId: createdUserId });
      user = await User.getUser(createdUserId);
    } else if (!user.lnId) {
      await createLinkedInAuth({ id, displayName, userId: user.id });
    }

    return cb(null, pick(user, ['id', 'username', 'role', 'email']));
  } catch (err) {
    return cb(err, {});
  }
}

export const linkedinData = {
  linkedin: {
    onAuthenticationSuccess,
    verifyCallback
  }
};

export default (settings.auth.social.linkedin.enabled && !__TEST__ ? new AuthModule() : undefined);
