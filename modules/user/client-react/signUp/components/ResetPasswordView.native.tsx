import React from 'react';
import { View, StyleSheet } from 'react-native';

import ResetPasswordForm from './ResetPasswordForm.native';
import { ResetPasswordSubmitProps } from '../index.native';

interface ResetPasswordViewProps {
  onSubmit: (values: ResetPasswordSubmitProps) => void;
}

const ResetPasswordView: React.FunctionComponent<ResetPasswordViewProps> = ({ onSubmit }) => (
  <View style={styles.container}>
    <ResetPasswordForm onSubmit={onSubmit} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1
  }
});

export default ResetPasswordView;
