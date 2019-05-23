import React from 'react';
import { RouteProps } from 'react-router';
import { History } from 'history';
import { connect } from 'react-redux';
import authentication from '@restapp/authentication-client-react';
import { getItem } from '@restapp/core-common/clientStorage';
import { User, UserRole } from '..';
import CLEAR_USER from '../actions/clearUser';
import { CURRENT_USER } from '../actions';

import setting from '../../../../settings';

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
  class WithUser extends React.Component<WithUserProps> {
    public async componentDidMount() {
      const { currentUser, getCurrentUser } = this.props;
      if (currentUser === undefined && ((await getItem('refreshToken')) || setting.auth.session.enabled)) {
        await getCurrentUser();
      }
    }

    public render() {
      const { currentUserLoading, currentUser, getCurrentUser, ...rest } = this.props;
      return currentUserLoading ? null : <Component currentUser={currentUser} currentUserLoading {...rest} />;
    }
  }
  return connect(
    ({ currentUser: { loading, currentUser } }: any) => ({
      currentUserLoading: loading,
      currentUser
    }),
    { getCurrentUser: CURRENT_USER }
  )(WithUser);
};

const hasRole = (role: UserRole | UserRole[], currentUser: User) => {
  return currentUser && (!role || (Array.isArray(role) ? role : [role]).indexOf(currentUser.role) >= 0) ? true : false;
};

const IfLoggedInComponent: React.FunctionComponent<IfLoggedInComponent> = ({
  currentUser,
  role,
  children,
  elseComponent
}) => (hasRole(role, currentUser) ? React.cloneElement(children, {}) : elseComponent || null);

const IfLoggedIn: React.ComponentType<IfLoggedInComponent> = withUser(IfLoggedInComponent);

const IfNotLoggedInComponent: React.FunctionComponent<IfLoggedInComponent> = ({ currentUser, children }) => {
  return !currentUser ? React.cloneElement(children, {}) : null;
};

const IfNotLoggedIn: React.ComponentType<IfLoggedInComponent> = withUser(IfNotLoggedInComponent);

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

export { withUser, hasRole, IfLoggedIn, IfNotLoggedIn, withLogout };
