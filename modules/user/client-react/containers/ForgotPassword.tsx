import React, { useState } from 'react';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import ForgotPasswordView from '../components/ForgotPasswordView';

import { CommonProps, User } from '..';

import { FORGOT_PASSWORD } from '../actions';

interface ForgotPasswordProps extends CommonProps {}

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = props => {
  const { t } = props;

  const [sent, setSent] = useState(false);

  const onSubmit = async (values: User) => {
    setSent(true);
    try {
      await FORGOT_PASSWORD(values);
    } catch (e) {
      throw new FormError(t('forgotPass.errorMsg'), e);
    }
  };

  return <ForgotPasswordView forgotPassword={FORGOT_PASSWORD} {...props} sent={sent} onSubmit={onSubmit} />;
};

export default translate('user')(ForgotPassword);
