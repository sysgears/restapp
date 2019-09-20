import React, { useState } from 'react';
import { connect } from 'react-redux';

import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import ForgotPasswordView from '../components/ForgotPasswordView';
import { CommonProps } from '../../types';
import { ForgotPasswordSubmitProps } from '../types';
import { forgotPassword } from '../actions';

interface ForgotPasswordProps extends CommonProps {
  forgotPassword: (values: ForgotPasswordSubmitProps) => any;
}

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = props => {
  const { t, forgotPassword: actionForgotPassword } = props;

  const [sent, setSent] = useState(false);

  const onSubmit = async (values: ForgotPasswordSubmitProps) => {
    setSent(true);
    try {
      await actionForgotPassword(values);
    } catch (e) {
      throw new FormError(t('forgotPass.errorMsg'), e);
    }
  };

  return <ForgotPasswordView {...props} sent={sent} onSubmit={onSubmit} />;
};

export default connect(
  null,
  { forgotPassword }
)(translate('userSignUp')(ForgotPassword));
