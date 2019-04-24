import React from 'react';
import { translate } from '@restapp/i18n-client-react';

import { FormError } from '@restapp/forms-client-react';
import ResetPasswordView from '../components/ResetPasswordView.native';

import { CommonProps } from '../index.native';

interface ResetPasswordProps extends CommonProps {
  resetPassword: (value: any) => void;
  match: any;
}

const ResetPassword: React.FunctionComponent<ResetPasswordProps> = props => {
  const { t, resetPassword, navigation, match } = props;

  const onSubmit = async (values: any) => {
    try {
      await resetPassword({ ...values, token: match.params.token });
    } catch (e) {
      throw new FormError(t('resetPass.errorMsg'), e);
    }
    navigation.navigate('Login');
  };

  return <ResetPasswordView {...props} onSubmit={onSubmit} />;
};

export default translate('user')(ResetPassword);
