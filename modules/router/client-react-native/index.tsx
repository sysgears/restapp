import React from 'react';
import { createDrawerNavigator, NavigationContainer } from 'react-navigation';

import ClientModule from '@restapp/module-client-react-native';
import { DrawerComponent } from '@restapp/look-client-react-native';

const ref: { navigator: NavigationContainer } = { navigator: null };

const MainScreenNavigator = () => {
  const Navigator = ref.navigator;
  return <Navigator />;
};

export default new ClientModule({
  router: <MainScreenNavigator />,
  onAppCreate: [
    (modules: ClientModule) =>
      (ref.navigator = createDrawerNavigator(
        {
          ...modules.drawerItems
        },
        {
          // eslint-disable-next-line
          contentComponent: props => <DrawerComponent {...props} drawerItems={modules.drawerItems} />
        }
      ))
  ]
});
