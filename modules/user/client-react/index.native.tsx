import React from 'react';
import { NavigationContainer } from 'react-navigation';
import ClientModule from '@restapp/module-client-react-native';

import signUp from './signUp/index.native';
import users from './users/index.native';
import profile from './profile/index.native';
import resources from './locales';
import DataRootComponent from './containers/DataRootComponent.native';
import UserScreenNavigator from './containers/UserScreenNavigator.native';

export const ref: { navigator: NavigationContainer } = {
  navigator: null
};

const MainScreenNavigator = () => {
  const Navigator = ref.navigator;
  return <Navigator />;
};

export default new ClientModule(signUp, profile, users, {
  localization: [{ ns: 'user', resources }],
  router: <MainScreenNavigator />,
  dataRootComponent: [DataRootComponent],
  onAppCreate: [(module: ClientModule) => (ref.navigator = UserScreenNavigator(module.drawerItems))]
});
