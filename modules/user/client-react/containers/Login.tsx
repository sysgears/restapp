import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from '@restapp/i18n-client-react';
import authentication from '@restapp/authentication-client-react';
import { FormError } from '@restapp/forms-client-react';

import LoginView from '../components/LoginView';

import { CommonProps, LoginSubmitProps } from '..';
import { UserModuleAction, ActionType } from '../reducers';
import { LOGIN } from '../actions';

export interface LoginProps extends CommonProps {
  login: (values: LoginSubmitProps) => void;
  clearUser: () => void;
}

const Login: React.FunctionComponent<LoginProps> = props => {
  const { t, history, login, clearUser } = props;
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
    await authentication.doLogin(clearUser);
  };

  return isReady && <LoginView {...props} isRegistered={isRegistered} hideModal={hideModal} onSubmit={onSubmit} />;
};

export default connect(
  _state => ({}),
  (dispatch: UserModuleAction) => {
    return {
      login: (value: LoginSubmitProps) =>
        dispatch({
          type: [null, ActionType.SET_CURRENT_USER, ActionType.CLEAR_CURRENT_USER],
          promise: () => LOGIN(value)
        }),
      clearUser: () =>
        dispatch({
          type: ActionType.CLEAR_CURRENT_USER
        })
    };
  }
)(translate('user')(Login));
