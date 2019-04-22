import React from 'react';
import { FormError } from '@restapp/forms-client-react';
import { translate } from '@restapp/i18n-client-react';

import LoginView from '../components/LoginView.native';

import { CommonProps, LoginSubmitProps, ref } from '../index.native';

interface LoginProps extends CommonProps {
  login: (values: LoginSubmitProps) => Promise<void> | void;
}

const Login = (props: LoginProps) => {
  const { t, login } = props;

  const onSubmit = async (values: LoginSubmitProps) => {
    try {
      await login(values);
    } catch (e) {
      throw new FormError(t('login.errorMsg'), e);
    }

    await ref.module.authentication.doLogin();
  };

  return <LoginView {...props} onSubmit={onSubmit} />;
};

export default translate('user')(Login);
