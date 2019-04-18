import * as React from 'react';

import { translate } from '@restapp/i18n-client-react';
import authentication from '@restapp/authentication-session-client-react';

import LoginView from '../components/LoginView';

import { CommonProps, LoginSubmitProps } from '..';

interface LoginProps extends CommonProps {
  login: (values: LoginSubmitProps) => void;
}

const Login: React.FunctionComponent<LoginProps> = props => {
  const { history } = props;
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

  const onSubmit = async () => {
    await authentication.doLogin();
  };

  return isReady && <LoginView {...props} isRegistered={isRegistered} hideModal={hideModal} onSubmit={onSubmit} />;
};

export default translate('user')(Login);
