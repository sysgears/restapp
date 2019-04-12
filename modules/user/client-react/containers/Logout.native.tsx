import React from 'react';
import { compose } from 'redux';
import { View } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { HeaderTitle } from '@restapp/look-client-react-native';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';

import { withLogout } from './Auth';

interface LogoutView {
  logout: () => any;
  error: string;
  navigation: NavigationScreenProp<NavigationRoute<Params>, Params>;
  t: TranslateFunction;
}

interface Params {}

const LogoutView = ({ logout, t }) => {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <HeaderTitle
        onPress={async () => {
          await logout();
        }}
      >
        {t('mobile.logout')}
      </HeaderTitle>
    </View>
  );
};

export default compose(
  translate('user'),
  withLogout
)(LogoutView);
