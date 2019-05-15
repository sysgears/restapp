import { pick } from 'lodash';
import { AuthModule } from '@restapp/authentication-server-ts';
import { onAuthenticationSuccess, registerUser, UserSocial } from '../shared';
import UserDAO, { UserShape } from '../../sql';
import settings from '../../../../../settings';

const createFacebookAuth = async (user: any) => UserDAO.createFacebookAuth(user);

async function verifyCallback(accessToken: string, refreshToken: string, profile: UserSocial, cb: any) {
  const {
    id,
    displayName,
    emails: [{ value }]
  } = profile;

  try {
    let user = (await UserDAO.getUserByFbIdOrEmail(id, value)) as UserShape & { fbId: number };

    if (!user) {
      const [createdUserId] = await registerUser(profile);
      await createFacebookAuth({ id, displayName, userId: createdUserId });
      user = (await UserDAO.getUser(createdUserId)) as UserShape & { fbId: number };
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
