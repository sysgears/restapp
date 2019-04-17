import * as React from 'react';

import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import authentication from '@restapp/authentication-client-react';

import LoginView from '../components/LoginView';

import { CommonProps, LoginSubmitProps } from '..';

interface LoginProps extends CommonProps {
  login: (values: LoginSubmitProps) => void;
}

const Login: React.FunctionComponent<LoginProps> = props => {
  const { t, login, history } = props;
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
    try {
      await login(values);
    } catch (e) {
      throw new FormError(t('login.errorMsg'), e);
    }

    await authentication.doLogin();
    history.push('/profile');
  };

  return isReady && <LoginView {...props} isRegistered={isRegistered} hideModal={hideModal} onSubmit={onSubmit} />;
};

export default translate('user')(Login);
