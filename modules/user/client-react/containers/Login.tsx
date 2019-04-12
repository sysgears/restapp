import * as React from 'react';
import * as H from 'history';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import authentication from '@restapp/authentication-client-react';

import LoginView from '../components/LoginView';

interface Login {
  login: (arg: any) => any;
  t: TranslateFunction;
  history: H.History;
}

const Login: React.FunctionComponent<Login> = props => {
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

  const onSubmit = async values => {
    try {
      await login(values);
    } catch (e) {
      throw new FormError(t('login.errorMsg'), e);
    }

    await authentication.doLogin(client);
    history.push('/profile');
  };

  return (
    <React.Fragment>
      {isReady && <LoginView {...props} isRegistered={isRegistered} hideModal={hideModal} onSubmit={onSubmit} />}
    </React.Fragment>
  );
};

export default Login;
