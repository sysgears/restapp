import { access } from '@restapp/authentication-server-ts';
import UserDAO, { UserShape } from '../sql';

export interface UserSocial {
  id: number;
  username: string;
  displayName: string;
  emails: Array<{ value: string }>;
}

export async function onAuthenticationSuccess(req: any, res: any) {
  const user = (await UserDAO.getUserWithPassword(req.user.id)) as UserShape;
  const redirectUrl = req.query.state;
  const tokens = await access.grantAccess(user, req, user.passwordHash);
  if (redirectUrl) {
    res.redirect(redirectUrl + (tokens ? '?data=' + JSON.stringify({ tokens }) : ''));
  } else {
    res.redirect('/profile');
  }
}

export const registerUser = async ({ username, displayName, emails: [{ value }] = [{ value: '' }] }: UserSocial) => {
  return UserDAO.register({
    username: username || displayName,
    email: value,
    isActive: true
  });
};
