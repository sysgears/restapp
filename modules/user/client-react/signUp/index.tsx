import React from 'react';

import { MenuItem } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';

import Login from './containers/Login';
import Register from './containers/Register';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';
import Logout from './containers/Logout';
import NavLinkLoginWithI18n from './containers/NavLoginLink';
import signUpReducer from './reducers';
import resources from './locales';

import { AuthRoute, IfLoggedIn, IfNotLoggedIn } from '../containers/Auth';

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
        <Logout />
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
