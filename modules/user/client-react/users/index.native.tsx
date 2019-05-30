import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { translate } from '@restapp/i18n-client-react';
import { HeaderTitle, IconButton } from '@restapp/look-client-react-native';
import ClientModule from '@restapp/module-client-react-native';

import resources from './locales';
import Users from './containers/Users.native';
import UserEdit from './containers/UserEdit.native';
import UserAdd from './containers/UserAdd';
import { NavigationOptionsProps } from '../index.native';
import usersReducer from './reducers';

export interface OrderBy {
  column: string;
  order: string;
}

export interface Filter {
  searchText: string;
  role: string;
  isActive: boolean;
}

class UsersListScreen extends React.Component<NavigationOptionsProps> {
  public render() {
    return <Users navigation={this.props.navigation} />;
  }
}

class UserEditScreen extends React.Component<NavigationOptionsProps> {
  public static navigationOptions = () => ({
    title: 'Edit user'
  });
  public render() {
    return <UserEdit navigation={this.props.navigation} />;
  }
}

class UserAddScreen extends React.Component<NavigationOptionsProps> {
  public static navigationOptions = () => ({
    title: 'Create user'
  });
  public render() {
    return <UserAdd navigation={this.props.navigation} />;
  }
}

const HeaderTitleWithI18n = translate('userUsers')(HeaderTitle);

export default new ClientModule({
  drawerItem: [
    {
      Users: {
        screen: createStackNavigator({
          Users: {
            screen: UsersListScreen,
            navigationOptions: ({ navigation }: NavigationOptionsProps) => ({
              headerTitle: <HeaderTitleWithI18n i18nKey="navLink.users" style="subTitle" />,
              headerLeft: (
                <IconButton iconName="menu" iconSize={32} iconColor="#0275d8" onPress={() => navigation.openDrawer()} />
              ),
              headerRight: (
                <IconButton
                  iconName="filter"
                  iconSize={32}
                  iconColor="#0275d8"
                  onPress={() => {
                    const isOpenFilter = navigation.getParam('isOpenFilter');
                    navigation.setParams({ isOpenFilter: !isOpenFilter });
                  }}
                />
              ),
              headerForceInset: {}
            })
          },
          UserEdit: {
            screen: UserEditScreen,
            navigationOptions: () => ({
              headerTitle: <HeaderTitleWithI18n i18nKey="navLink.editUser" style="subTitle" />,
              headerForceInset: {}
            })
          },
          UserAdd: {
            screen: UserAddScreen,
            navigationOptions: () => ({
              headerTitle: <HeaderTitleWithI18n i18nKey="navLink.editUser" style="subTitle" />,
              headerForceInset: {}
            })
          }
        }),
        userInfo: {
          showOnLogin: true,
          role: 'admin'
        },
        navigationOptions: {
          drawerLabel: <HeaderTitleWithI18n i18nKey="navLink.users" />
        }
      }
    }
  ],
  localization: [{ ns: 'userUsers', resources }],
  reducer: [{ usersReducer }]
});
