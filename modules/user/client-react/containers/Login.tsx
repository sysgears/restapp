import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from '@restapp/i18n-client-react';
import authentication from '@restapp/authentication-client-react';
import { FormError } from '@restapp/forms-client-react';

import LoginView from '../components/LoginView';
import { CommonProps, LoginSubmitProps } from '..';

import { LOGIN } from '../actions';

export interface LoginProps extends CommonProps {
  login: (values: LoginSubmitProps) => any;
}

const Login: React.FunctionComponent<LoginProps> = props => {
  const { t, history, login } = props;
  const {
    location: { search }
  } = history;

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (search.includes('email-verified')) {
      setIsRegistered(true);
    }
    setIsReady(true);
  }, []);

  const hideModal = () => {
    setIsRegistered(false);
    history.push({ search: '' });
  };

  const onSubmit = async (values: LoginSubmitProps) => {
    const data = await login(values);

    if (data && data.errors) {
      throw new FormError(t('reg.errorMsg'), data);
    }
    await authentication.doLogin();
  };

  return isReady && <LoginView {...props} isRegistered={isRegistered} hideModal={hideModal} onSubmit={onSubmit} />;
};

export default connect(
  null,
  { login: LOGIN }
)(translate('user')(Login));
