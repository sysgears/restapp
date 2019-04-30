import { pick } from 'lodash';
import { AuthModule } from '@restapp/authentication-server-ts';
import { onAuthenticationSuccess, registerUser, UserSocial } from '../shared';
import User from '../../sql';
import settings from '../../../../../settings';

const createFacebookAuth = async (user: any) => User.createFacebookAuth(user);

async function verifyCallback(accessToken: string, refreshToken: string, profile: UserSocial, cb: any) {
  const {
    id,
    displayName,
    emails: [{ value }]
  } = profile;

  try {
    let user: any = await User.getUserByFbIdOrEmail(id, value);

    if (!user) {
      const [createdUserId] = await registerUser(profile);
      await createFacebookAuth({ id, displayName, userId: createdUserId });
      user = await User.getUser(createdUserId);
    } else if (!user.fbId) {
      await createFacebookAuth({ id, displayName, userId: user.id });
    }

    return cb(null, pick(user, ['id', 'username', 'role', 'email']));
  } catch (err) {
    return cb(err, {});
  }
}

export const facebookData = {
  facebook: {
    onAuthenticationSuccess,
    verifyCallback
  }
};

export default (settings.auth.social.facebook.enabled && !__TEST__ ? new AuthModule() : undefined);
