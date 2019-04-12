import * as React from 'react';
import { createStackNavigator, NavigationContainer, NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { translate } from '@restapp/i18n-client-react';
import { HeaderTitle, IconButton } from '@restapp/look-client-react-native';
import ClientModule from '@restapp/module-client-react-native';

import resources from './locales';
import DataRootComponent from './containers/DataRootComponent';
import UserScreenNavigator from './containers/UserScreenNavigator.native';
import Login from './containers/Login.native';
import Logout from './containers/Logout.native';

interface NavigationOptionsProps {
  navigation: NavigationScreenProp<NavigationRoute<Params>, Params>;
}

interface Params {}

class LoginScreen extends React.Component<NavigationOptionsProps> {
  public static navigationOptions = ({ navigation }: NavigationOptionsProps) => ({
    headerTitle: <HeaderTitleWithI18n i18nKey="navLink.signIn" style="subTitle" />,
    headerLeft: <IconButton iconName="menu" iconSize={32} iconColor="#0275d8" onPress={() => navigation.openDrawer()} />
  });

  public render() {
    return <Login navigation={this.props.navigation} />;
  }
}

const AuthScreen = createStackNavigator(
  {
    Login: { screen: LoginScreen }
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

const HeaderTitleWithI18n = translate('user')(HeaderTitle);

export * from './containers/Auth';

const ref: { navigator: NavigationContainer } = { navigator: null };

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
  onAppCreate: [modules => (ref.navigator = UserScreenNavigator(modules.drawerItems))]
});
