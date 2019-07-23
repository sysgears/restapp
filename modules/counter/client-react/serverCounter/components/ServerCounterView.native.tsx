import React from 'react';
import { StyleSheet, Text, View, TextStyle } from 'react-native';

import { Button, Loading, primary } from '@restapp/look-client-react-native';
import { TranslateFunction } from '@restapp/i18n-client-react';

interface ViewProps {
  t: TranslateFunction;
  children: any;
  counter: any;
  loading: boolean;
}

const styles = StyleSheet.create({
  element: {
    paddingTop: 30
  },
  box: {
    textAlign: 'center',
    marginBottom: 5
  }
});

export const ServerCounterView = ({ t, children, counter, loading }: ViewProps) => {
  if (loading) {
    return <Loading text={t('loading')} />;
  } else {
    return (
      <View>
        <View style={styles.element}>
          <Text style={styles.box as TextStyle}>{t('text', { amount: counter.amount })}</Text>
        </View>
        {children}
      </View>
    );
  }
};

interface ButtonProps {
  onClick: () => any;
  text: string;
}

export const ServerCounterButton = ({ onClick, text }: ButtonProps) => (
  <Button type={primary} onPress={onClick}>
    {text}
  </Button>
);
