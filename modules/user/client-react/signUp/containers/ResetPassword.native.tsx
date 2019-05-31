import React from 'react';
import { connect } from 'react-redux';

import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import ResetPasswordView from '../components/ResetPasswordView.native';
import { RESET_PASSWORD } from '../actions';
import { CommonProps } from '../../types';
import { ResetPasswordSubmitProps } from '../types';

interface Token {
  token: string;
}

interface ResetPasswordProps extends CommonProps {
  resetPassword?: (value: ResetPasswordSubmitProps & Token) => void;
  match?: any;
}

const ResetPassword: React.FunctionComponent<ResetPasswordProps> = props => {
  const { t, resetPassword, navigation, match } = props;

  const onSubmit = async (values: ResetPasswordSubmitProps) => {
    try {
      await resetPassword({ ...values, token: match.params.token });
    } catch (e) {
      throw new FormError(t('resetPass.errorMsg'), e);
    }
    navigation.navigate('Login');
  };

  return <ResetPasswordView {...props} onSubmit={onSubmit} />;
};

export default connect<{}, {}, ResetPasswordProps>(
  null,
  { resetPassword: RESET_PASSWORD }
)(translate('userSignUp')(ResetPassword));
