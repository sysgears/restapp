import * as React from 'react';
import { CookiesProvider } from 'react-cookie';
import { NavLink, withRouter } from 'react-router-dom';
import { translate } from '@restapp/i18n-client-react';
import { MenuItem } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';

import resources from './locales';
import DataRootComponent from './containers/DataRootComponent';
import Login from './containers/Login';

import { AuthRoute, IfLoggedIn, IfNotLoggedIn, withLoadedUser, withLogout, WithLogoutProps } from './containers/Auth';

export enum UserRole {
  admin = 'admin',
  user = 'user'
}
export interface CurrentUser {
  username: string;
  role: UserRole;
  isActive: boolean;
  email: string;
  fullName: string;
}
// TODO check how null redner in dom
const ProfileName: React.FunctionComponent<WithLogoutProps> = withLoadedUser(({ currentUser }) => (
  <React.Fragment>{currentUser ? currentUser.fullName || currentUser.username : null}</React.Fragment>
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
// export { default as LOGIN } from './graphql/Login.graphql';

const NavLinkUsersWithI18n = translate('user')(({ t }) => (
  <NavLink to="/users" className="nav-link" activeClassName="active">
    {t('navLink.users')}
  </NavLink>
));
const NavLinkLoginWithI18n = translate('user')(({ t }) => (
  <NavLink to="/login" className="nav-link" activeClassName="active">
    {t('navLink.signIn')}
  </NavLink>
));

export default new ClientModule({
  route: [<AuthRoute exact path="/login" redirectOnLoggedIn redirect="/" component={Login} />],
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
  // resolver: [resolvers],
  localization: [{ ns: 'user', resources }],
  dataRootComponent: [DataRootComponent],
  // eslint-disable-next-line react/display-name
  rootComponentFactory: [req => (req ? <CookiesProvider cookies={req.universalCookies} /> : <CookiesProvider />)]
});
