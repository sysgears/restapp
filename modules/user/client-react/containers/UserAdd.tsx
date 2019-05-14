import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import UserAddView from '../components/UserAddView';
import UserFormatter from '../helpers/UserFormatter';
import { CommonProps as RNCommonProps } from '../index.native';
import { User, CommonProps } from '..';
import { ADD_USER } from '../actions';

interface UserAddProps extends CommonProps, RNCommonProps {
  addUser: (values: User) => any;
}

const UserAdd: React.FunctionComponent<UserAddProps> = props => {
  const { addUser, t, history, navigation } = props;

  const onSubmit = async (values: User) => {
    let userValues = pick(values, ['username', 'email', 'role', 'isActive', 'password', 'firstName', 'lastName']);

    userValues = UserFormatter.trimExtraSpaces(userValues);

    try {
      await addUser(userValues as User);
    } catch (e) {
      const data = e.response && e.response.data;
      throw new FormError(t('userAdd.errorMsg'), data);
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

export default translate('user')(
  connect(
    null,
    { addUser: ADD_USER }
  )(UserAdd)
);
