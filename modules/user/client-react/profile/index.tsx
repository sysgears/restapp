import React from 'react';
import { NavLink } from 'react-router-dom';

import { MenuItem } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';

import resources from './locales';
import Profile from './containers/Profile';
import { AuthRoute, IfLoggedIn, withUser } from '../containers/Auth';

export enum UserRole {
  admin = 'admin',
  user = 'user'
}

const ProfileName = withUser(({ currentUser }) => (
  <>{currentUser ? currentUser.fullName || currentUser.username : null}</>
));

export default new ClientModule({
  route: [
    <AuthRoute exact path="/profile" role={[UserRole.user, UserRole.admin]} redirect="/login" component={Profile} />
  ],
  navItemRight: [
    <IfLoggedIn key="/profile">
      <MenuItem>
        <NavLink to="/profile" className="nav-link" activeClassName="active">
          <ProfileName />
        </NavLink>
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: 'userProfile', resources }]
});
