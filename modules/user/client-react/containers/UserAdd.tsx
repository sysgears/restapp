import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { pick } from 'lodash';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import UserAddView from '../components/UserAddView';
import settings from '../../../../settings';
import UserFormatter from '../helpers/UserFormatter';
import { CommonProps as RNCommonProps } from '../index.native';
import { User, CommonProps } from '..';
import { ADD_USER } from '../actions';

interface UserAddProps extends CommonProps, RNCommonProps {
  addUser: (values: User) => void;
}

const UserAdd: React.FunctionComponent<UserAddProps> = props => {
  const { addUser, t, history, navigation } = props;

  const onSubmit = async (values: User) => {
    let userValues = pick(values, ['username', 'email', 'role', 'isActive', 'password']) as User;

    userValues.profile = pick(values.profile, ['firstName', 'lastName']);

    userValues = UserFormatter.trimExtraSpaces(userValues) as User;

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

export default compose(
  translate('user'),
  connect(
    _state => ({}),
    dispatch => ({
      addUser: (values: User) =>
        dispatch({
          type: null,
          request: () => ADD_USER(values)
        })
    })
  )(UserAdd)
);
