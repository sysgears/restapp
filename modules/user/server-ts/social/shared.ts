import { access } from '@restapp/authentication-server-ts';
import User from '../sql';

export interface UserSocial {
  id: number;
  username: string;
  displayName: string;
  emails: Array<{ value: string }>;
}

export async function onAuthenticationSuccess(req: any, res: any) {
  // TODO add type of user
  const user: any = await User.getUserWithPassword(req.user.id);
  const redirectUrl = req.query.state;
  const tokens = await access.grantAccess(user, req, user.passwordHash);
  if (redirectUrl) {
    res.redirect(redirectUrl + (tokens ? '?data=' + JSON.stringify({ tokens }) : ''));
  } else {
    res.redirect('/profile');
  }
}

export const registerUser = async ({ username, displayName, emails: [{ value }] = [{ value: '' }] }: UserSocial) => {
  return User.register({
    username: username || displayName,
    email: value,
    isActive: true
  });
};
