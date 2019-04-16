import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import React from 'react';
import { pickBy } from 'lodash';
import { compose } from 'redux';
import { DrawerComponent } from '@restapp/look-client-react-native';

import { withUser } from './Auth';

interface UserScreenNavigator {
  currentUser: any;
  context: any;
  currentUserLoading: boolean;
  routeConfigs: any;
}

class UserScreenNavigator extends React.Component<UserScreenNavigator> {
  public shouldComponentUpdate(nextProps: UserScreenNavigator) {
    const { currentUserLoading, currentUser } = this.props;
    /**
     * After a user edits the profile the CurrentUser being updated in the State as well.
     * That leads to the Navigator re-rendering and, as a result, takes the user back to the initial route.
     * In order to let the user get back to his/her profile we need to prevent the Navigator
     * re-render action after profile was edited
     */
    return !(
      !currentUserLoading &&
      currentUser &&
      nextProps.currentUser &&
      currentUser.id === nextProps.currentUser.id &&
      currentUser.role === nextProps.currentUser.role
    );
  }

  public navItemsFilter = () => {
    const { currentUser, currentUserLoading, routeConfigs } = this.props;

    const userFilter = (value: any) => {
      if (!value.userInfo) {
        return true;
      }
      const { showOnLogin, role } = value.userInfo;
      return showOnLogin && (!role || (Array.isArray(role) ? role : [role]).includes(currentUser.role));
    };

    const guestFilter = (value: any) => !value.userInfo || (value.userInfo && !value.userInfo.showOnLogin);

    return pickBy(routeConfigs, currentUser && !currentUserLoading ? userFilter : guestFilter);
  };

  public getInitialRoute = () => {
    const { currentUser } = this.props;
    return currentUser ? 'Profile' : 'Counter';
  };

  public render() {
    const MainScreenNavigatorComponent = createAppContainer(
      createDrawerNavigator(
        { ...this.navItemsFilter() },
        {
          // eslint-disable-next-line
          contentComponent: props => <DrawerComponent {...props} drawerItems={this.props.routeConfigs} />,
          initialRouteName: this.getInitialRoute()
        }
      )
    );

    return <MainScreenNavigatorComponent />;
  }
}

const drawerNavigator: any = (routeConfigs: any) => {
  const withRoutes = (Component: React.ComponentType<any>) => {
    const ownProps = { routeConfigs };
    const WithRoutesComponent = ({ ...props }) => <Component {...props} {...ownProps} />;
    return WithRoutesComponent;
  };

  return compose(
    withUser,
    withRoutes
  )(UserScreenNavigator);
};

export default drawerNavigator;
