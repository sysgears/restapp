import React, { ComponentType, FunctionComponent } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

import { withUser } from './AuthBase';
import { UserRole, User } from '..';
import { WithUserProps } from './AuthBase';

interface AuthRouteProps extends WithUserProps {
  role?: UserRole | UserRole[];
  redirect?: string;
  redirectOnLoggedIn?: boolean;
  component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

const AuthRoute: ComponentType<AuthRouteProps> = withUser(
  ({ currentUser, role, redirect = '/login', redirectOnLoggedIn, component: Component, ...rest }) => {
    const RenderComponent: FunctionComponent<any> = props => {
      // The users is not logged in
      if (redirectOnLoggedIn && currentUser) {
        return <Redirect to={{ pathname: redirect }} />;
      }

      return isRoleMatch(role, currentUser) ? (
        <Component currentUser={currentUser} {...props} {...rest} />
      ) : (
        <Redirect to={{ pathname: redirect }} />
      );
    };

    return <Route {...rest} render={RenderComponent} />;
  }
);

const isRoleMatch = (role: UserRole | UserRole[], currentUser: User) => {
  if (!role) {
    return true;
  }
  return currentUser && (Array.isArray(role) ? role : [role]).includes(currentUser.role);
};

export * from './AuthBase';
export { AuthRoute };
