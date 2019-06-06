import React from 'react';
import { connect } from 'react-redux';

import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import RegisterView from '../components/RegisterView';
import { CommonProps } from '../../types';
import { RegisterSubmitProps } from '../types';
import { register } from '../actions';
import settings from '../../../../../settings';

interface RegisterProps extends CommonProps {
  register: (values: RegisterSubmitProps) => any;
}

const Register: React.FunctionComponent<RegisterProps> = props => {
  const { t, register: actionRegister, history } = props;

  const [isRegistered, setIsRegistered] = React.useState(false);

  const onSubmit = async (values: RegisterSubmitProps) => {
    try {
      await await actionRegister(values);
    } catch (e) {
      const data = e.response && e.response.data;
      throw new FormError(t('reg.errorMsg'), data);
    }

    if (!settings.auth.password.requireEmailConfirmation) {
      history.push('/');
    } else {
      setIsRegistered(true);
    }
  };

  return <RegisterView {...props} isRegistered={isRegistered} onSubmit={onSubmit} />;
};

export default connect(
  null,
  { register }
)(translate('userSignUp')(Register));
