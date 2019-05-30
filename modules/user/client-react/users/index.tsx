import React from 'react';
import { NavLink } from 'react-router-dom';

import { translate } from '@restapp/i18n-client-react';
import { MenuItem } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';

import resources from './locales';
import Users from './containers/Users';
import UserEdit from './containers/UserEdit';
import UserAdd from './containers/UserAdd';
import { AuthRoute, IfLoggedIn } from '../containers/Auth';
import usersReducer from './reducers';

export enum UserRole {
  admin = 'admin',
  user = 'user'
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

export * from '../containers/Auth';

const NavLinkUsersWithI18n = translate('userUsers')(({ t }: any) => (
  <NavLink to="/users" className="nav-link" activeClassName="active">
    {t('navLink.users')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute exact path="/users" redirect="/profile" role={UserRole.admin} component={Users} />,
    <AuthRoute exact path="/users/new" role={[UserRole.admin]} component={UserAdd} />,
    <AuthRoute path="/users/:id" redirect="/profile" role={[UserRole.user, UserRole.admin]} component={UserEdit} />
  ],
  navItem: [
    <IfLoggedIn key="/users" role={UserRole.admin}>
      <MenuItem>
        <NavLinkUsersWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: 'userUsers', resources }],
  reducer: [{ usersReducer }]
});
