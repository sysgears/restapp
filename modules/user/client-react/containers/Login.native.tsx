import React from 'react';
import { FormError } from '@restapp/forms-client-react';
import { translate } from '@restapp/i18n-client-react';
import authentication from '@restapp/authentication-client-react';
import { connect } from 'react-redux';
import LoginView from '../components/LoginView.native';
import { CommonProps, LoginSubmitProps } from '../index.native';
import { LOGIN } from '../actions';

export interface LoginProps extends CommonProps {
  login: (values: LoginSubmitProps) => Promise<void> | any;
}

class Login extends React.Component<LoginProps> {
  public onSubmit = async (values: LoginSubmitProps) => {
    const { t, login } = this.props;
    const data = await login(values);

    if (data && data.errors) {
      throw new FormError(t('reg.errorMsg'), data);
    }

    await authentication.doLogin();
  };
  public render() {
    return <LoginView {...this.props} onSubmit={this.onSubmit} />;
  }
}

const withConnect = connect(
  null,
  { login: LOGIN }
);

export default translate('user')(withConnect(Login));
