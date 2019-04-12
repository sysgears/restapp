import * as React from 'react';
import authentication from '@restapp/authentication-client-react';
import { RouteProps } from 'react-router';
import { History } from 'history';

import { CurrentUser, UserRole } from '..';

export interface WithUserProps extends RouteProps {
  currentUser?: CurrentUser;
  currentUserLoading?: boolean;
  refetchCurrentUser?: any;
  children?: Element | any;
}

interface IfLoggedInComponent {
  role?: UserRole | UserRole[];
  currentUser?: CurrentUser;
  refetchCurrentUser?: any;
  elseComponent?: Element | any;
  children?: Element | any;
}

export interface WithLogoutProps extends WithUserProps {
  logout?: () => any;
  history?: History;
}

const withUser = <P extends WithUserProps>(Component: React.ComponentType<P>) => {
  const WithUser: React.FunctionComponent<P> = ({ ...props }) => <Component {...props as P} />;

  return WithUser;
};

const hasRole = (role: UserRole | UserRole[], currentUser: CurrentUser) => {
  return currentUser && (!role || (Array.isArray(role) ? role : [role]).indexOf(currentUser.role) >= 0) ? true : false;
};

const withLoadedUser = <P extends WithUserProps>(Component: React.ComponentType<P>) => {
  const WithLoadedUser: React.FunctionComponent<P> = ({ currentUserLoading, ...props }) =>
    currentUserLoading ? null : <Component {...props as P} />;

  return withUser(WithLoadedUser);
};

const IfLoggedInComponent: React.FunctionComponent<IfLoggedInComponent> = ({
  currentUser,
  role,
  children,
  elseComponent,
  refetchCurrentUser,
  ...restProps
}) =>
  hasRole(role, currentUser)
    ? React.cloneElement(children, {
        ...restProps
      })
    : elseComponent || null;

const IfLoggedIn = withLoadedUser(IfLoggedInComponent);

const IfNotLoggedInComponent: React.FunctionComponent<IfLoggedInComponent> = ({
  currentUser,
  children,
  refetchCurrentUser,
  ...restProps
}) =>
  !currentUser
    ? React.cloneElement(children, {
        ...restProps
      })
    : null;

const IfNotLoggedIn = withLoadedUser(IfNotLoggedInComponent);

const withLogout = (Component: React.FunctionComponent<WithLogoutProps>) => ({ ...props }: WithLogoutProps) => {
  const newProps = {
    ...props,
    logout: () => authentication.doLogout()
  };
  return <Component {...newProps} />;
};

export { withUser, hasRole, withLoadedUser, IfLoggedIn, IfNotLoggedIn, withLogout };
