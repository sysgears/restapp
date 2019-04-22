import React, { useState } from 'react';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import RegisterView from '../components/RegisterView';

import { CommonProps, RegisterSubmitProps } from '..';
import settings from '../../../../settings';

interface RegisterProps extends CommonProps {
  register: (values: RegisterSubmitProps) => void;
}

const Register: React.FunctionComponent<RegisterProps> = props => {
  const { t, register, history } = props;

  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit = async (values: RegisterSubmitProps) => {
    try {
      await register(values);
      if (!settings.auth.password.requireEmailConfirmation) {
        history.push('/login');
      } else {
        setIsRegistered(true);
      }
    } catch (e) {
      throw new FormError(t('reg.errorMsg'), e);
    }
  };

  return <RegisterView {...props} isRegistered={isRegistered} onSubmit={onSubmit} />;
};

export default translate('user')(Register);