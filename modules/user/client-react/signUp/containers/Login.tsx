import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { translate } from '@restapp/i18n-client-react';
import authentication from '@restapp/authentication-client-react';
import { FormError } from '@restapp/forms-client-react';
import { setItem } from '@restapp/core-common/clientStorage';

import LoginView from '../components/LoginView';
import { CommonProps } from '../../types';
import { LoginSubmitProps } from '../types';
import { login } from '../actions';

export interface LoginProps extends CommonProps {
  login?: (values: LoginSubmitProps) => any;
}

const Login: React.FunctionComponent<LoginProps> = props => {
  const { t, history, login: actionLogin } = props;
  const {
    location: { search }
  } = history;

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    if (search.includes('data')) {
      checkAndSaveTokens();
    }
  }, []);

  useEffect(() => {
    if (search.includes('email-verified')) {
      setIsRegistered(true);
    }
    setIsReady(true);
  }, []);

  const checkAndSaveTokens = async () => {
    const dataRegExp = /data=([^#]+)/;

    const [, data] = search.match(dataRegExp);
    const decodedData = JSON.parse(decodeURI(data));

    if (decodedData.tokens) {
      await setItem('accessToken', decodedData.tokens.accessToken);
      await setItem('refreshToken', decodedData.tokens.refreshToken);

      await authentication.doLogin();
    }

    history.push('profile');
  };

  const hideModal = () => {
    setIsRegistered(false);
    history.push({ search: '' });
  };

  const onSubmit = async (values: LoginSubmitProps) => {
    try {
      await actionLogin(values);
    } catch (e) {
      const data = e.response && e.response.data;

      throw new FormError(t('reg.errorMsg'), data);
    }

    await authentication.doLogin();
    history.push('/profile');
  };

  return isReady && <LoginView {...props} isRegistered={isRegistered} hideModal={hideModal} onSubmit={onSubmit} />;
};

export default connect(
  null,
  { login }
)(translate('userSignUp')(Login));
