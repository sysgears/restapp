import React from 'react';
import { View } from 'react-native';
import { HeaderTitle } from '@restapp/look-client-react-native';
import { translate } from '@restapp/i18n-client-react';

import { withLogout } from './Auth';

import { CommonProps } from '../index.native';

interface LogoutViewProps extends CommonProps {
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

export default withLogout(translate('user')(LogoutView));
