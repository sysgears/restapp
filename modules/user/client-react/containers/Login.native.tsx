import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import authentication from '@restapp/authentication-client-react';

import LoginView from '../components/LoginView';

const Login = props => {
  const { t, login, client } = props;

  const onSubmit = async values => {
    try {
      await login(values);
    } catch (e) {
      throw new FormError(t('login.errorMsg'), e);
    }

    await authentication.doLogin(client);
    // await client.writeQuery({ query: CURRENT_USER_QUERY, data: { currentUser: login.user } });
  };

  return <LoginView {...props} onSubmit={onSubmit} />;
};

Login.propTypes = {
  login: PropTypes.func,
  t: PropTypes.func,
  client: PropTypes.object
};

const LoginWithApollo = compose(translate('user'))(Login);

export default LoginWithApollo;
