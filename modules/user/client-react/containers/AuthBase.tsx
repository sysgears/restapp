import * as React from 'react';
import { RouteProps } from 'react-router';
import { History } from 'history';
import { connect } from 'react-redux';
import authentication from '@restapp/authentication-client-react';
import { User, UserRole } from '..';
import CLEAR_USER from '../actions/clearUser';

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
  const WithUser = ({ currentUser, ...rest }: WithUserProps) => <Component currentUser={currentUser} {...rest} />;
  return connect(({ currentUser: { loading, currentUser } }: any) => ({
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

const IfLoggedInComponent: React.FunctionComponent<IfLoggedInComponent> = ({
  currentUser,
  role,
  children,
  elseComponent
}) => (hasRole(role, currentUser) ? React.cloneElement(children, {}) : elseComponent || null);

const IfLoggedIn: React.ComponentType<IfLoggedInComponent> = withLoadedUser(IfLoggedInComponent);

const IfNotLoggedInComponent: React.FunctionComponent<IfLoggedInComponent> = ({ currentUser, children }) => {
  return !currentUser ? React.cloneElement(children, {}) : null;
};

const IfNotLoggedIn: React.ComponentType<IfLoggedInComponent> = withLoadedUser(IfNotLoggedInComponent);

const withLogout = (Component: React.ComponentType<any>) => {
  const WithLogout = ({ clearUser, ...props }: WithLogoutProps) => {
    const newProps = {
      ...props,
      logout: () => authentication.doLogout(clearUser)
    };
    return <Component {...newProps} />;
  };

  return connect(
    null,
    { clearUser: CLEAR_USER }
  )(WithLogout);
};

export { withUser, hasRole, withLoadedUser, IfLoggedIn, IfNotLoggedIn, withLogout };
