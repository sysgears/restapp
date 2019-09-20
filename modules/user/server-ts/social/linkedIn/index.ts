import { UserShape } from './../../sql';
import { pick } from 'lodash';
import { AuthModule } from '@restapp/authentication-server-ts';
import { onAuthenticationSuccess, registerUser, UserSocial } from '../shared';
import UserDAO from '../../sql';
import settings from '../../../../../settings';

const createLinkedInAuth = async (user: any) => UserDAO.createLinkedInAuth(user);

async function verifyCallback(accessToken: string, refreshToken: string, profile: UserSocial, cb: any) {
  const { id, displayName } = profile;
  try {
    let user = (await UserDAO.getUserByLnInIdOrEmail(id)) as UserShape & { lnId: number };

    if (!user) {
      const [createdUserId] = await registerUser(profile);
      await createLinkedInAuth({ id, displayName, userId: createdUserId });
      user = (await UserDAO.getUser(createdUserId)) as UserShape & { lnId: number };
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
