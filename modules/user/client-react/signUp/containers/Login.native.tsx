import React from 'react';
import { connect } from 'react-redux';

import { FormError } from '@restapp/forms-client-react';
import { translate } from '@restapp/i18n-client-react';
import authentication from '@restapp/authentication-client-react';

import LoginView from '../components/LoginView.native';
import { CommonProps } from '../../types';
import { LoginSubmitProps } from '../types';
import { login } from '../actions';

export interface LoginProps extends CommonProps {
  login?: (values: LoginSubmitProps) => Promise<void> | any;
}

class Login extends React.Component<LoginProps> {
  public onSubmit = async (values: LoginSubmitProps) => {
    const { t, login: actionLogin } = this.props;

    try {
      await actionLogin(values);
    } catch (e) {
      const data = e.response && e.response.data;
      throw new FormError(t('reg.errorMsg'), data);
    }

    await authentication.doLogin();
  };
  public render() {
    return <LoginView {...this.props} onSubmit={this.onSubmit} />;
  }
}

export default connect<{}, {}, LoginProps>(
  null,
  { login }
)(translate('userSignUp')(Login));