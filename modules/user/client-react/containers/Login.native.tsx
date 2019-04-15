import React from 'react';
import { compose } from 'redux';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { FormError } from '@restapp/forms-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import authentication from '@restapp/authentication-client-react';

import LoginView from '../components/LoginView.native';

export interface OnSubmitProps {
  usernameOrEmail: string;
  password: string;
}
export interface UserComponentPropsNative {
  error?: string;
  navigation: NavigationScreenProp<NavigationRoute<Params>, Params>;
  t: TranslateFunction;
}
interface Params {}

export interface LoginPropsNative extends UserComponentPropsNative {
  login: (values: OnSubmitProps) => Promise<void> | void;
}

const Login = (props: LoginPropsNative) => {
  const { t, login } = props;

  const onSubmit = async (values: OnSubmitProps) => {
    try {
      await login(values);
    } catch (e) {
      throw new FormError(t('login.errorMsg'), e);
    }

    await authentication.doLogin();
  };

  return <LoginView {...props} onSubmit={onSubmit} />;
};

export default compose(translate('user'))(Login);
