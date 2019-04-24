import React from 'react';
import { View, StyleSheet } from 'react-native';

import ResetPasswordForm from '../components/ResetPasswordForm.native';

interface ResetPasswordViewProps {
  onSubmit: (values: any) => void;
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
