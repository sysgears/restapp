import React from 'react';
import { FormError } from '@restapp/forms-client-react';
import { translate } from '@restapp/i18n-client-react';
import authentication from '@restapp/authentication-client-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LoginView from '../components/LoginView.native';
import { CommonProps, LoginSubmitProps } from '../index.native';
import { UserModuleAction, ActionType } from '../reducers';
import { LOGIN } from '../actions';

interface LoginProps extends CommonProps {
  login?: (values: LoginSubmitProps) => Promise<void> | void;
}

const Login = (props: LoginProps) => {
  const { t, login } = props;

  const onSubmit = async (values: LoginSubmitProps) => {
    try {
      await login(values);
    } catch (e) {
      throw new FormError(t('login.errorMsg'), e);
    }

    await authentication.doLogin();
  };

  return <LoginView {...props} onSubmit={onSubmit} />;
};

const withConnect = connect(
  _state => ({}),
  (dispatch: UserModuleAction) => {
    return {
      login: (value: LoginSubmitProps) =>
        dispatch({
          type: [null, ActionType.SET_CURRENT_USER, ActionType.CLEAR_CURRENT_USER],
          request: () => LOGIN(value)
        }),
      clearUser: () =>
        dispatch({
          type: ActionType.CLEAR_CURRENT_USER
        })
    };
  }
);

export default compose(
  translate('user'),
  withConnect(Login)
);
