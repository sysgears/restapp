import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import ForgotPasswordForm from './ForgotPasswordForm.native';

import { User } from '../index.native';

interface ForgotPasswordViewProps {
  onSubmit: (values: any) => void;
  forgotPassword: (values: User) => void;
  sent: boolean;
}

class ForgotPasswordView extends React.PureComponent<ForgotPasswordViewProps> {
  public render() {
    const { onSubmit, sent, forgotPassword } = this.props;
    return (
      <View style={styles.forgotPassContainer}>
        <ForgotPasswordForm onSubmit={onSubmit({ forgotPassword })} sent={sent} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  forgotPassContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});

export default ForgotPasswordView;
