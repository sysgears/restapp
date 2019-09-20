import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { TranslateFunction } from '@restapp/i18n-client-react';

interface HeaderTitleProps {
  t?: TranslateFunction;
  style?: any;
  i18nKey?: string;
  children?: React.ReactNode | any;
  onPress?: () => any;
}

const HeaderTitle = ({ t, i18nKey, style, children, ...props }: HeaderTitleProps) => (
  <Text {...props} style={typeof style === 'string' ? styles[style] : style || styles.menuTitle}>
    {t ? t(i18nKey || 'navLink') : children}
  </Text>
);

const styles = StyleSheet.create({
  menuTitle: {
    padding: 16,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: Platform.OS === 'ios' ? 17 : 20,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: 'rgba(0, 0, 0, .9)',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    marginHorizontal: 16
  }
});

export default HeaderTitle;
