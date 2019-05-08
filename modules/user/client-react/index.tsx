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
import Register from './containers/Register';
import Login from './containers/Login';
import reducers from './reducers';

import { AuthRoute, IfLoggedIn, IfNotLoggedIn, withLogout, WithLogoutProps } from './containers/Auth';

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
export interface ResetPasswordSubmitProps {
  password: string;
  passwordConfirmation: string;
}
export interface ForgotPasswordSubmitProps {
  email: string;
}

export interface RegisterSubmitProps {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface CommonProps {
  t?: TranslateFunction;
  history?: H.History;
}

interface HandleSubmitProps<P> {
  setErrors: (errors: FormikErrors<P>) => void;
  props: P;
}

interface Errors {
  message?: string;
}
export interface FormProps<V> {
  handleSubmit: (values: V, props: HandleSubmitProps<V>) => void;
  onSubmit: (values: V) => Promise<void> | void | any;
  submitting?: boolean;
  errors: Errors;
  values: V;
  t?: TranslateFunction;
}

export interface OrderBy {
  column: string;
  order: string;
}

export interface Filter {
  searchText: string;
  role: string;
  isActive: boolean;
}

const LogoutLink = withRouter(
  withLogout(({ logout, history }: WithLogoutProps) => (
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

const NavLinkLoginWithI18n = translate('user')(({ t }: any) => (
  <NavLink to="/login" className="nav-link" activeClassName="active">
    {t('navLink.signIn')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute exact path="/register" redirectOnLoggedIn redirect="/profile" component={Register} />,
    <AuthRoute exact path="/login" redirectOnLoggedIn redirect="/" component={Login} />
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
  localization: [{ ns: 'user', resources }],
  reducer: [{ user: reducers }],
  dataRootComponent: [DataRootComponent],
  rootComponentFactory: [req => (req ? <CookiesProvider cookies={req.universalCookies} /> : <CookiesProvider />)]
});
