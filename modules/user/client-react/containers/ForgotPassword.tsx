import React, { useState } from 'react';

import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import ForgotPasswordView from '../components/ForgotPasswordView';

import { CommonProps, User } from '..';

interface ForgotPasswordProps extends CommonProps {
  forgotPassword: (values: User) => void;
}

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = props => {
  const { forgotPassword, t } = props;

  const [sent, setSent] = useState(false);

  const onSubmit = async (values: User) => {
    setSent(true);
    try {
      await forgotPassword(values);
    } catch (e) {
      throw new FormError(t('forgotPass.errorMsg'), e);
    }
  };

  return <ForgotPasswordView {...props} sent={sent} onSubmit={onSubmit} />;
};

export default translate('user')(ForgotPassword);
