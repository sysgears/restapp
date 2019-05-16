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
import ForgotPassword from './containers/ForgotPassword.native';
import ResetPassword from './containers/ResetPassword.native';

import { currentUserReducer, usersReducer } from './reducers';

export enum UserRole {
  admin = 'admin',
  user = 'user'
}

interface Auth {
  lnDisplayName: string;
  lnId: string;
  googleDisplayName: string;
  googleId: string;
  ghDisplayName: string;
  ghId: string;
  fbId: string;
  fbDisplayName: string;
}

interface UserProfile {
  fullName?: string;
  firstName?: string;
  lastName?: string;
}

export interface User extends UserProfile, Auth {
  id?: number | string;
  username: string;
  role: UserRole;
  isActive: boolean;
  email: string;
}

export interface NavigationOptionsProps {
  navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>;
}

export interface CommonProps extends NavigationOptionsProps {
  error?: string;
  t?: TranslateFunction;
}

export interface LoginSubmitProps {
  usernameOrEmail: string;
  password: string;
}

export interface ResetPasswordSubmitProps {
  password: string;
  passwordConfirmation: string;
}

export interface ForgotPasswordSubmitProps {
  email: string;
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
  t?: TranslateFunction;
}

export interface OrderBy {
  column: string;
  order: string;
}

export interface Filter {
  searchText: string;
  role: string;
  isActive: boolean;
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

class ForgotPasswordScreen extends React.Component<NavigationOptionsProps> {
  public static navigationOptions = () => ({
    headerTitle: <HeaderTitleWithI18n i18nKey="navLink.forgotPassword" style="subTitle" />,
    headerForceInset: {}
  });
  public render() {
    return <ForgotPassword navigation={this.props.navigation} />;
  }
}

class ResetPasswordScreen extends React.Component<NavigationOptionsProps> {
  public static navigationOptions = () => ({
    headerTitle: <HeaderTitleWithI18n i18nKey="navLink.resetPassword" style="subTitle" />,
    headerForceInset: {}
  });
  public render() {
    return <ResetPassword navigation={this.props.navigation} />;
  }
}

const AuthScreen = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    ForgotPassword: { screen: ForgotPasswordScreen },
    ResetPassword: { screen: ResetPasswordScreen },
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
      Login: {
        screen: AuthScreen,
        userInfo: {
          showOnLogin: false
        },
        navigationOptions: {
          drawerLabel: <HeaderTitleWithI18n i18nKey="navLink.signIn" />
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
  reducer: [{ currentUser: currentUserReducer, users: usersReducer }],
  dataRootComponent: [DataRootComponent],
  onAppCreate: [(module: ClientModule) => (ref.navigator = UserScreenNavigator(module.drawerItems))]
});
