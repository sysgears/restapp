import { pick } from 'lodash';
import { AuthModule } from '@restapp/authentication-server-ts';
import { onAuthenticationSuccess, UserSocial } from '../shared';
import User from '../../sql';
import settings from '../../../../../settings';

interface UserSocialGoogle extends UserSocial {
  name: {
    givenName?: string;
    familyName?: string;
  };
}

const registerUser = async ({ emails: [{ value }] }: UserSocial) => {
  return User.register({
    username: value,
    email: value,
    isActive: true
  });
};

const createGoogleOAuth = async (user: any) => User.createGoogleOAuth(user);

async function verifyCallback(accessToken: string, refreshToken: string, profile: UserSocialGoogle, cb: any) {
  const {
    id,
    displayName,
    emails: [{ value }]
  } = profile;

  try {
    let user: any = await User.getUserByGoogleIdOrEmail(id, value);

    if (!user) {
      const [createdUserId] = await registerUser(profile);

      await createGoogleOAuth({ id, displayName, userId: createdUserId });

      await User.editUserProfile({
        id: createdUserId,
        profile: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        }
      });

      user = await User.getUser(createdUserId);
    } else if (!user.googleId) {
      await createGoogleOAuth({ id, displayName, userId: user.id });
    }

    return cb(null, pick(user, ['id', 'username', 'role', 'email']));
  } catch (err) {
    return cb(err, {});
  }
}

export const googleData = {
  google: {
    onAuthenticationSuccess,
    verifyCallback
  }
};

export default (settings.auth.social.google.enabled && !__TEST__ ? new AuthModule() : undefined);
