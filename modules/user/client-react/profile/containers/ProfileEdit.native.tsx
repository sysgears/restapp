import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';

import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import ProfileEditView from '../components/ProfileEditView.native';
import UserFormatter from '../../helpers/UserFormatter';
import { User, CommonProps } from '../../types';
import { user, editUser } from '../actions';

interface ProfileEditProps extends CommonProps {
  editableUser?: User;
  editUser?: (value: User) => any;
  location?: any;
  match?: any;
  getUser?: (id: number) => void;
}

const UserEdit: React.FunctionComponent<ProfileEditProps> = props => {
  const { editableUser, editUser: actionEditUser, t, match, getUser } = props;
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
      await actionEditUser({ id: editableUser.id, ...userValues } as any);
    } catch (e) {
      const data = e.response && e.response.data;
      throw new FormError(t('userEdit.errorMsg'), data);
    }
  };

  return ready ? <ProfileEditView onSubmit={onSubmit} {...props} user={editableUser} /> : null;
};

export default connect<{}, {}, ProfileEditProps>(
  ({ usersReducer: { user: editableUser } }: any) => ({
    editableUser
  }),
  { getUser: user, editUser }
)(translate('userUsers')(UserEdit));