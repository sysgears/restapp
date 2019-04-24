import * as React from 'react';
import {
  createStackNavigator,
  NavigationContainer,
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams
} from 'react-navigation';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { HeaderTitle, IconButton } from '@restapp/look-client-react-native';
import ClientModule from '@restapp/module-client-react-native';
import { FormikErrors } from 'formik';
import resources from './locales';
import DataRootComponent from './containers/DataRootComponent.native';
import UserScreenNavigator from './containers/UserScreenNavigator.native';
import Login from './containers/Login.native';
import Logout from './containers/Logout.native';
import Register from './containers/Register.native';
import Users from './containers/Users.native';
import Profile from './containers/Profile.native';
import UserEdit from './containers/UserEdit';
import UserAdd from './containers/UserAdd';

export enum UserRole {
  admin = 'admin',
  user = 'user'
}

export interface UserProfile {
  fullName?: string;
  firstName?: string;
  lastName?: string;
}

export interface User {
  id?: number | string;
  username: string;
  role: UserRole;
  isActive: boolean;
  email: string;
  profile?: UserProfile;
  auth?: any;
}

export interface NavigationOptionsProps {
  navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>;
}

export interface CommonProps extends NavigationOptionsProps {
  error?: string;
  t: TranslateFunction;
}

export interface LoginSubmitProps {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterSubmitProps {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface HandleSubmitProps<P> {
  setErrors: (errors: FormikErrors<P>) => void;
  props: P;
}

interface Errors {
  errorMsg?: string;
}

export interface FormProps<V> {
  handleSubmit: (values: V, props: HandleSubmitProps<V>) => void;
  onSubmit: (values: V) => Promise<void> | void | any;
  submitting?: boolean;
  errors: Errors;
  values: V;
  t: TranslateFunction;
}

class LoginScreen extends React.Component<NavigationOptionsProps> {
  public static navigationOptions = ({ navigation }: NavigationOptionsProps) => ({
    headerTitle: <HeaderTitleWithI18n i18nKey="navLink.signIn" style="subTitle" />,
    headerLeft: (
      <IconButton iconName="menu" iconSize={32} iconColor="#0275d8" onPress={() => navigation.openDrawer()} />
    ),
    headerForceInset: {}
  });

  public render() {
    return <Login navigation={this.props.navigation} />;
  }
}
class RegisterScreen extends React.Component<NavigationOptionsProps> {
  public static navigationOptions = () => ({
    headerTitle: <HeaderTitleWithI18n i18nKey="navLink.register" style="subTitle" />,
    headerForceInset: {}
  });
  public render() {
    return <Register navigation={this.props.navigation} />;
  }
}

const AuthScreen = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen }
  },
  {
    cardStyle: {
      backgroundColor: '#fff'
    },
    navigationOptions: {
      headerStyle: { backgroundColor: '#fff' }
    }
  }
);

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

class ProfileScreen extends React.Component<NavigationOptionsProps> {
  public static navigationOptions = () => ({
    title: 'Profile'
  });
  public render() {
    return <Profile navigation={this.props.navigation} />;
  }
}

class ProfilerEditScreen extends React.Component<NavigationOptionsProps> {
  public static navigationOptions = () => ({
    title: 'Edit profile'
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

export * from './containers/Auth.native';

const HeaderTitleWithI18n = translate('user')(HeaderTitle);

export const ref: { navigator: NavigationContainer } = {
  navigator: null
};

const MainScreenNavigator = () => {
  const Navigator = ref.navigator;
  return <Navigator />;
};

export default new ClientModule({
  drawerItem: [
    {
      Profile: {
        screen: createStackNavigator({
          Profile: {
            screen: ProfileScreen,
            navigationOptions: ({ navigation }: NavigationOptionsProps) => ({
              headerTitle: <HeaderTitleWithI18n i18nKey="navLink.profile" style="subTitle" />,
              headerLeft: (
                <IconButton iconName="menu" iconSize={32} iconColor="#0275d8" onPress={() => navigation.openDrawer()} />
              ),
              headerForceInset: {}
            })
          },
          ProfileEdit: {
            screen: ProfilerEditScreen,
            navigationOptions: () => ({
              headerTitle: <HeaderTitleWithI18n i18nKey="navLink.editProfile" style="subTitle" />,
              headerForceInset: {}
            })
          }
        }),
        userInfo: {
          showOnLogin: true,
          role: [UserRole.user, UserRole.admin]
        },
        navigationOptions: {
          drawerLabel: <HeaderTitleWithI18n i18nKey="navLink.profile" />
        }
      },
      Login: {
        screen: AuthScreen,
        userInfo: {
          showOnLogin: false
        },
        navigationOptions: {
          drawerLabel: <HeaderTitleWithI18n i18nKey="navLink.signIn" />
        }
      },
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
      },
      Logout: {
        screen: (): null => null,
        userInfo: {
          showOnLogin: true
        },
        navigationOptions: ({ navigation }: NavigationOptionsProps) => {
          return {
            drawerLabel: <Logout navigation={navigation} />
          };
        }
      }
    }
  ],
  localization: [{ ns: 'user', resources }],
  router: <MainScreenNavigator />,
  dataRootComponent: [DataRootComponent],
  onAppCreate: [(module: ClientModule) => (ref.navigator = UserScreenNavigator(module.drawerItems))]
});
