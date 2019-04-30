import * as React from 'react';
import { RouteProps } from 'react-router';
import { History } from 'history';
import { connect } from 'react-redux';
import authentication from '@restapp/authentication-client-react';
import CURRENT_USER from '../actions/currentUser';
import { User, UserRole } from '..';
import { ActionType } from '../reducers';
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
}

const withUser = (Component: React.ComponentType<any>) => {
  const WithUser = ({ getCurrentUser, currentUser, ...rest }: WithUserProps) => {
    React.useEffect(() => {
      if (!currentUser) {
        getCurrentUser();
      }
    }, []);
    return <Component currentUser={currentUser} {...rest} />;
  };
  return connect(
    ({ user: { loading, currentUser } }: any) => ({
      currentUserLoading: loading,
      currentUser
    }),
    dispatch => ({
      getCurrentUser: () =>
        dispatch({
          type: [ActionType.SET_LOADING, ActionType.SET_CURRENT_USER, ActionType.CLEAR_CURRENT_USER],
          promise: () => CURRENT_USER
        })
    })
  )(WithUser);
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
  elseComponent,
  refetchCurrentUser,
  ...restProps
}) =>
  hasRole(role, currentUser)
    ? React.cloneElement(children, {
        ...restProps
      })
    : elseComponent || null;

const IfLoggedIn: React.ComponentType<IfLoggedInComponent> = withLoadedUser(IfLoggedInComponent);

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

const IfNotLoggedIn: React.ComponentType<IfLoggedInComponent> = withLoadedUser(IfNotLoggedInComponent);

const withLogout = (Component: React.FunctionComponent<WithLogoutProps>) => ({ ...props }: WithLogoutProps) => {
  const newProps = {
    ...props,
    logout: () => authentication.doLogout()
  };
  return <Component {...newProps} />;
};

export { withUser, hasRole, withLoadedUser, IfLoggedIn, IfNotLoggedIn, withLogout };
