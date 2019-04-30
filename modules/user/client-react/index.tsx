import * as React from 'react';
import * as H from 'history';
import { CookiesProvider } from 'react-cookie';
import { NavLink, withRouter } from 'react-router-dom';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { MenuItem } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';
import { FormikErrors } from 'formik';

import resources from './locales';
import DataRootComponent from './containers/DataRootComponent';
import Login from './containers/Login';
import Register from './containers/Register';
import Users from './containers/Users';
import UserEdit from './containers/UserEdit';
import UserAdd from './containers/UserAdd';
import Profile from './containers/Profile';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';

import reducers from './reducers';

import { AuthRoute, IfLoggedIn, IfNotLoggedIn, withLoadedUser, withLogout } from './containers/Auth';

export enum UserRole {
  admin = 'admin',
  user = 'user'
}

export interface UserProfile {
  fullName?: string;
  firstName?: string;
  lastName?: string;
}

export interface User {
  id?: number | string;
  username: string;
  role: UserRole;
  isActive: boolean;
  email: string;
  profile?: UserProfile;
  auth?: any;
}

export interface LoginSubmitProps {
  usernameOrEmail: string;
  password: string;
}

export interface CommonProps {
  t: TranslateFunction;
  history?: H.History;
}

export interface RegisterSubmitProps {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface HandleSubmitProps<P> {
  setErrors: (errors: FormikErrors<P>) => void;
  props: P;
}

interface Errors {
  errorMsg?: string;
}
export interface FormProps<V> {
  handleSubmit: (values: V, props: HandleSubmitProps<V>) => void;
  onSubmit: (values: V) => Promise<void> | void | any;
  submitting?: boolean;
  errors: Errors;
  values: V;
  t: TranslateFunction;
}

const ProfileName = withLoadedUser(({ currentUser }) => (
  <>{currentUser ? currentUser.profile.fullName || currentUser.username : null}</>
));

const LogoutLink = withRouter(
  withLogout(({ logout, history }) => (
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
  ))
);

export * from './containers/Auth';

const NavLinkUsersWithI18n = translate('user')(({ t }: any) => (
  <NavLink to="/users" className="nav-link" activeClassName="active">
    {t('navLink.users')}
  </NavLink>
));
const NavLinkLoginWithI18n = translate('user')(({ t }: any) => (
  <NavLink to="/login" className="nav-link" activeClassName="active">
    {t('navLink.signIn')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute exact path="/profile" role={[UserRole.user, UserRole.admin]} redirect="/login" component={Profile} />,
    <AuthRoute exact path="/users" redirect="/profile" role={UserRole.admin} component={Users} />,
    <AuthRoute exact path="/users/new" role={[UserRole.admin]} component={UserAdd} />,
    <AuthRoute path="/users/:id" redirect="/profile" role={[UserRole.user, UserRole.admin]} component={UserEdit} />,
    <AuthRoute exact path="/login" redirectOnLoggedIn redirect="/" component={Login} />,
    <AuthRoute exact path="/register" redirectOnLoggedIn redirect="/profile" component={Register} />,
    <AuthRoute exact path="/forgot-password" redirectOnLoggedIn redirect="/profile" component={ForgotPassword} />,
    <AuthRoute exact path="/reset-password/:token" redirectOnLoggedIn redirect="/profile" component={ResetPassword} />
  ],
  navItem: [
    <IfLoggedIn key="/users" role={UserRole.admin}>
      <MenuItem>
        <NavLinkUsersWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemRight: [
    <IfLoggedIn key="/profile">
      <MenuItem>
        <NavLink to="/profile" className="nav-link" activeClassName="active">
          <ProfileName />
        </NavLink>
      </MenuItem>
    </IfLoggedIn>,
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
  localization: [{ ns: 'user', resources }],
  reducer: [{ user: reducers }],
  dataRootComponent: [DataRootComponent],
  rootComponentFactory: [req => (req ? <CookiesProvider cookies={req.universalCookies} /> : <CookiesProvider />)]
});
