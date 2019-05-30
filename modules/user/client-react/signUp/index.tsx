import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { translate } from '@restapp/i18n-client-react';
import { MenuItem } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';

import Login from './containers/Login';
import Register from './containers/Register';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';
import signUpReducer from './reducers';
import resources from './locales';

import { AuthRoute, IfLoggedIn, IfNotLoggedIn, withLogout, WithLogoutProps } from '../containers/Auth';

export interface LoginSubmitProps {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterSubmitProps {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ResetPasswordSubmitProps {
  password: string;
  passwordConfirmation: string;
}
export interface ForgotPasswordSubmitProps {
  email: string;
}

const LogoutLink = withRouter(withLogout(({ logout, history }: WithLogoutProps) => (
  <a
    href="javascript:void(0)"
    onClick={e => {
      e.preventDefault();
      (async () => {
        await logout();
        history.push('/');
      })();
    }}
    className="nav-link"
  >
    Logout
  </a>
)) as any);

const NavLinkLoginWithI18n = translate('userSignUp')(({ t }: any) => (
  <NavLink to="/login" className="nav-link" activeClassName="active">
    {t('navLink.signIn')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute exact path="/login" redirectOnLoggedIn redirect="/" component={Login} />,
    <AuthRoute exact path="/register" redirectOnLoggedIn redirect="/profile" component={Register} />,
    <AuthRoute exact path="/forgot-password" redirectOnLoggedIn redirect="/profile" component={ForgotPassword} />,
    <AuthRoute exact path="/reset-password/:token" redirectOnLoggedIn redirect="/profile" component={ResetPassword} />
  ],
  navItemRight: [
    <IfLoggedIn key="/logout">
      <MenuItem>
        <LogoutLink />
      </MenuItem>
    </IfLoggedIn>,
    <IfNotLoggedIn key="/login">
      <MenuItem>
        <NavLinkLoginWithI18n />
      </MenuItem>
    </IfNotLoggedIn>
  ],
  localization: [{ ns: 'userSignUp', resources }],
  reducer: [{ signUpReducer }]
});
