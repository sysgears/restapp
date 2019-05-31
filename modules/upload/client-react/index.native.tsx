import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ClientModule from '@restapp/module-client-react-native';
import { translate } from '@restapp/i18n-client-react';
import { HeaderTitle, IconButton } from '@restapp/look-client-react-native';
import Upload from './containers/Upload';
import resources from './locales';
import uploadReducer from './reducers';

const HeaderTitleWithI18n = translate('upload')(HeaderTitle);

export default new ClientModule({
  drawerItem: [
    {
      Upload: {
        screen: createStackNavigator({
          Upload: {
            screen: Upload,
            navigationOptions: ({ navigation }: { [key: string]: any }) => ({
              headerTitle: <HeaderTitleWithI18n i18nKey="title" style="subTitle" />,
              headerLeft: (
                <IconButton iconName="menu" iconSize={32} iconColor="#0275d8" onPress={() => navigation.openDrawer()} />
              ),
              headerStyle: { backgroundColor: '#fff' }
            })
          }
        }),
        navigationOptions: {
          drawerLabel: <HeaderTitleWithI18n />
        }
      }
    }
  ],
  reducer: [{ uploadReducer }],
  localization: [{ ns: 'upload', resources }]
});
