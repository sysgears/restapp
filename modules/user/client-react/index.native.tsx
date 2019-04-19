import * as React from 'react';
import { createStackNavigator, NavigationContainer, NavigationScreenProp, NavigationRoute } from 'react-navigation';
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

export enum UserRole {
  admin = 'admin',
  user = 'user'
}

export interface NavigationOptionsProps {
  navigation: NavigationScreenProp<NavigationRoute<Params>, Params>;
}

interface Params {}

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
  submitting: boolean;
  errors: Errors;
  values: V;
  t: TranslateFunction;
}

interface Authentication {
  doLogin: () => void;
  doLogout: () => void;
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

export * from './containers/Auth.native';

const HeaderTitleWithI18n = translate('user')(HeaderTitle);

export const ref: { navigator: NavigationContainer; authentication: Authentication } = {
  navigator: null,
  authentication: null
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
  dataRootComponent: [DataRootComponent],
  onAppCreate: [
    (modules: ClientModule) => {
      ref.navigator = UserScreenNavigator(modules.drawerItems);
      ref.authentication = UserScreenNavigator(modules.authentication);
      return ref;
    }
  ]
});
