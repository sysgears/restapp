import * as React from 'react';
import { pick } from 'lodash';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import UserEditView from '../components/UserEditView';

import settings from '../../../../settings';
import UserFormatter from '../helpers/UserFormatter';
import { User, CommonProps } from '..';
import { CommonProps as RNCommonProps } from '../index.native';

interface UserEditProps extends CommonProps, RNCommonProps {
  user: User;
  editUser: (value: User) => void;
  location: any;
}

const UserEdit: React.FunctionComponent<UserEditProps> = props => {
  const { user, editUser, t, history, navigation } = props;

  const onSubmit = async (values: User) => {
    let userValues = pick(values, ['username', 'email', 'role', 'isActive', 'password']) as User;

    userValues.profile = pick(values.profile, ['firstName', 'lastName']);

    userValues = UserFormatter.trimExtraSpaces(userValues);

    if (settings.auth.certificate.enabled) {
      userValues.auth = { certificate: pick(values.auth.certificate, 'serial') };
    }

    try {
      await editUser({ id: user.id, ...userValues });
    } catch (e) {
      throw new FormError(t('userEdit.errorMsg'), e);
    }

    if (history) {
      return history.goBack();
    }

    if (navigation) {
      return navigation.goBack();
    }
  };

  return <UserEditView onSubmit={onSubmit} {...props} />;
};

export default translate('user')(UserEdit);
