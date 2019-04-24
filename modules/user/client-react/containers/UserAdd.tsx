import React from 'react';
import { pick } from 'lodash';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import UserAddView from '../components/UserAddView';
import settings from '../../../../settings';
import UserFormatter from '../helpers/UserFormatter';
import { CommonProps as RNCommonProps } from '../index.native';
import { User, CommonProps } from '..';

interface UserAddProps extends CommonProps, RNCommonProps {
  addUser: (values: User) => Promise<void>;
}

const UserAdd: React.FunctionComponent<UserAddProps> = props => {
  const { addUser, t, history, navigation } = props;

  const onSubmit = async (values: User) => {
    let userValues = pick(values, ['username', 'email', 'role', 'isActive', 'password']) as User;

    userValues.profile = pick(values.profile, ['firstName', 'lastName']);

    userValues = UserFormatter.trimExtraSpaces(userValues);

    if (settings.auth.certificate.enabled) {
      userValues.auth = { certificate: pick(values.auth.certificate, 'serial') };
    }

    try {
      await addUser(userValues);
    } catch (e) {
      throw new FormError(t('userAdd.errorMsg'), e);
    }

    if (history) {
      return history.push('/users/');
    }
    if (navigation) {
      return navigation.goBack();
    }
  };

  return <UserAddView onSubmit={onSubmit} {...props} />;
};

export default translate('user')(UserAdd);
