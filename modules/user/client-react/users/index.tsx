import React from 'react';

import { MenuItem } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';

import resources from './locales';
import Users from './containers/Users';
import UserEdit from './containers/UserEdit';
import UserAdd from './containers/UserAdd';
import NavLinkUsersWithI18n from './containers/NavLink';
import { AuthRoute, IfLoggedIn } from '../containers/Auth';
import usersReducer from './reducers';
import { UserRole } from '../types';

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
