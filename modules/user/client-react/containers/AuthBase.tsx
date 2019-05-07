import * as React from 'react';
import { RouteProps } from 'react-router';
import { History } from 'history';
import { connect } from 'react-redux';
import { User, UserRole } from '..';

export interface WithUserProps extends RouteProps {
  currentUser?: User;
  currentUserLoading?: boolean;
  refetchCurrentUser?: any;
  children?: Element | any;
  getCurrentUser?: () => void;
}

interface IfLoggedInComponent {
  role?: UserRole | UserRole[];
  currentUser?: User;
  refetchCurrentUser?: any;
  elseComponent?: Element | any;
  children?: Element | any;
}

export interface WithLogoutProps extends WithUserProps {
  logout?: () => void;
  history?: History;
  clearUser?: () => void;
}

const withUser = (Component: React.ComponentType<any>) => {
  const WithUser = ({ currentUser, ...rest }: WithUserProps) => {
    return <Component currentUser={currentUser} {...rest} />;
  };
  return connect(({ user: { loading, currentUser } }: any) => ({
    currentUserLoading: loading,
    currentUser
  }))(WithUser);
};

const hasRole = (role: UserRole | UserRole[], currentUser: User) => {
  return currentUser && (!role || (Array.isArray(role) ? role : [role]).indexOf(currentUser.role) >= 0) ? true : false;
};

const withLoadedUser = (Component: React.ComponentType<any>) => {
  const WithLoadedUser = ({ currentUserLoading, ...props }: WithUserProps) => {
    return currentUserLoading ? null : <Component {...props} />;
  };

  return withUser(WithLoadedUser);
};

const IfNotLoggedInComponent: React.FunctionComponent<IfLoggedInComponent> = ({ currentUser, children }) => {
  return !currentUser ? React.cloneElement(children, {}) : null;
};

const IfNotLoggedIn: React.ComponentType<IfLoggedInComponent> = withLoadedUser(IfNotLoggedInComponent);

export { withUser, hasRole, withLoadedUser, IfNotLoggedIn };
