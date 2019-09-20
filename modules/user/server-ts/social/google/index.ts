import { pick } from 'lodash';
import { AuthModule } from '@restapp/authentication-server-ts';
import { onAuthenticationSuccess, UserSocial } from '../shared';
import UserDAO from '../../sql';
import settings from '../../../../../settings';
import { UserShape } from '@restapp/authentication-server-ts/access';

interface UserSocialGoogle extends UserSocial {
  name: {
    givenName?: string;
    familyName?: string;
  };
}

const registerUser = async ({ emails: [{ value }] }: UserSocial) => {
  return UserDAO.register({
    username: value,
    email: value,
    isActive: true
  });
};

const createGoogleOAuth = async (user: any) => UserDAO.createGoogleOAuth(user);

async function verifyCallback(accessToken: string, refreshToken: string, profile: UserSocialGoogle, cb: any) {
  const {
    id,
    displayName,
    emails: [{ value }]
  } = profile;

  try {
    let user = (await UserDAO.getUserByGoogleIdOrEmail(id, value)) as UserShape & { googleId: number };

    if (!user) {
      const [createdUserId] = await registerUser(profile);

      await createGoogleOAuth({ id, displayName, userId: createdUserId });

      await UserDAO.editUserProfile({
        id: createdUserId,
        profile: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        }
      });

      user = (await UserDAO.getUser(createdUserId)) as UserShape & { googleId: number };
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
