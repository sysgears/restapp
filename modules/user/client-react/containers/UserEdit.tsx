import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import UserEditView from '../components/UserEditView';

import UserFormatter from '../helpers/UserFormatter';
import { User, CommonProps } from '..';
import { USER, EDIT_USER } from '../actions';

interface UserEditProps extends CommonProps {
  user?: User;
  editUser?: (value: User) => any;
  location?: any;
  match?: any;
  getUser?: (id: number) => void;
}

const UserEdit: React.FunctionComponent<UserEditProps> = props => {
  const { user, editUser, t, history, match, getUser } = props;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      let id = 0;
      if (match) {
        id = match.params.id;
      }
      await getUser(Number(id));
      setReady(true);
    })();
  }, []);

  const onSubmit = async (values: User) => {
    let userValues = pick(values, ['username', 'email', 'role', 'isActive', 'password', 'firstName', 'lastName']);

    userValues = UserFormatter.trimExtraSpaces(userValues);

    try {
      await editUser({ id: user.id, ...userValues } as any);
    } catch (e) {
      const data = e.response && e.response.data;
      throw new FormError(t('userEdit.errorMsg'), data);
    }

    if (history) {
      return history.goBack();
    }
  };

  return ready ? <UserEditView onSubmit={onSubmit} {...props} /> : null;
};

export default connect(
  ({ users: { user } }: any) => ({
    user
  }),
  { getUser: USER, editUser: EDIT_USER }
)(translate('user')(UserEdit));
