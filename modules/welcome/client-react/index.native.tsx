import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { translate } from '@restapp/i18n-client-react';
import ClientModule from '@restapp/module-client-react-native';

import { HeaderTitle, IconButton } from '../../../packages/client/src/modules/common/components/native';
import Welcome from './containers/Welcome';
import resources from './locales';

const HeaderTitleWithI18n = translate('welcome')(HeaderTitle);

export default new ClientModule({
  drawerItem: [
    {
      Welcome: {
        screen: createStackNavigator({
          Welcome: {
            screen: Welcome,
            navigationOptions: ({ navigation }: any) => ({
              headerTitle: <HeaderTitleWithI18n style="subTitle" />,
              headerLeft: (
                <IconButton iconName="menu" iconSize={32} iconColor="#0275d8" onPress={() => navigation.openDrawer()} />
              ),
              headerStyle: { backgroundColor: '#fff' },
              headerForceInset: {}
            })
          }
        }),
        navigationOptions: {
          drawerLabel: <HeaderTitleWithI18n />
        }
      }
    }
  ],
  localization: [{ ns: 'welcome', resources }]
});
