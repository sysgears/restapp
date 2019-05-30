import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { translate } from '@restapp/i18n-client-react';
import { HeaderTitle, IconButton } from '@restapp/look-client-react-native';
import ClientModule from '@restapp/module-client-react-native';

import resources from './locales';
import Login from './containers/Login.native';
import Logout from './containers/Logout.native';
import Register from './containers/Register.native';
import ForgotPassword from './containers/ForgotPassword.native';
import ResetPassword from './containers/ResetPassword.native';
import { NavigationOptionsProps } from '../index.native';
import signUpReducer from './reducers';

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

const HeaderTitleWithI18n = translate('userSignUp')(HeaderTitle);

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
  localization: [{ ns: 'userSignUp', resources }],
  reducer: [{ signUpReducer }]
});
