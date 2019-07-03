import React from 'react';
import { connect } from 'react-redux';

import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import ResetPasswordView from '../components/ResetPasswordView';

import { ResetPasswordSubmitProps } from '../types';
import { resetPassword } from '../actions';
import { CommonProps } from '../../types';

interface Token {
  token: string;
}

interface ResetPasswordProps extends CommonProps {
  resetPassword: (value: ResetPasswordSubmitProps & Token) => void;
  match: any;
}

const ResetPassword: React.FunctionComponent<ResetPasswordProps> = props => {
  const { t, resetPassword: actionResetPassword, history, match } = props;

  const onSubmit = async (values: ResetPasswordSubmitProps) => {
    try {
      await actionResetPassword({ ...values, token: match.params.token });
    } catch (e) {
      throw new FormError(t('resetPass.errorMsg'), e);
    }
    history.push('/login');
  };

  return <ResetPasswordView {...props} onSubmit={onSubmit} />;
};

export default connect(
  null,
  { resetPassword }
)(translate('userSignUp')(ResetPassword));