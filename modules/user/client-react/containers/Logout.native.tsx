import React from 'react';
import { compose } from 'redux';
import { View } from 'react-native';
import { HeaderTitle } from '@restapp/look-client-react-native';
import { translate } from '@restapp/i18n-client-react';

import { UserComponentPropsNative } from './Login.native';
import { withLogout } from './Auth';

interface LogoutViewProps extends UserComponentPropsNative {
  logout: () => void;
}

const LogoutView = ({ logout, t }: LogoutViewProps) => {
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
