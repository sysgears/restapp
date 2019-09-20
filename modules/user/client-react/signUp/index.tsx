import React from 'react';

import { MenuItem } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';

import { Login, Register, ForgotPassword, ResetPassword, Logout, NavLoginLink } from './containers';
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
        <NavLoginLink />
      </MenuItem>
    </IfNotLoggedIn>
  ],
  localization: [{ ns: 'userSignUp', resources }],
  reducer: [{ signUpReducer }]
});
