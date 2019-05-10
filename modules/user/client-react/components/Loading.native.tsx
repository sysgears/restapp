import React from 'react';

import { View, Text } from 'react-native';
import { translate } from '@restapp/i18n-client-react';
import { LayoutCenter } from '@restapp/look-client-react-native';

import { CommonProps } from '../index.native';

interface LoadingProps extends CommonProps {}

const Loading = ({ t }: LoadingProps) => (
  <LayoutCenter>
    <View>
      <Text>{t('loading')}</Text>
    </View>
  </LayoutCenter>
);

export default translate('user')(Loading);
