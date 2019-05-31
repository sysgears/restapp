import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';

import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';

import UserEditView from '../components/UserEditView.native';
import UserFormatter from '../../helpers/UserFormatter';
import { CommonProps, User } from '../../types/typings';
import { USER, EDIT_USER } from '../actions';

interface UserEditProps extends CommonProps {
  user?: User;
  currentUser?: User;
  loading?: boolean;
  editUser?: (value: User) => any;
  getUser?: (id: number) => void;
}

class UserEdit extends React.Component<UserEditProps> {
  public state = { ready: false };
  public async componentDidMount() {
    let id = 0;
    if (this.props.navigation) {
      id = this.props.navigation.state.params.id;
    }
    await this.props.getUser(Number(id));
    this.setState({ ready: true });
  }
  public onSubmit = async (values: User) => {
    const { user, editUser, t, navigation } = this.props;

    let userValues = pick(values, ['username', 'email', 'role', 'isActive', 'password', 'firstName', 'lastName']);

    userValues = UserFormatter.trimExtraSpaces(userValues);

    try {
      await editUser({ id: user.id, ...userValues } as any);
    } catch (e) {
      const data = e.response && e.response.data;
      throw new FormError(t('userEdit.errorMsg'), data);
    }

    if (navigation) {
      return navigation.goBack();
    }
  };

  public render() {
    return this.state.ready ? <UserEditView onSubmit={this.onSubmit} {...this.props} /> : null;
  }
}

export default connect<{}, {}, UserEditProps>(
  ({ usersReducer: { user }, signUpReducer: { currentUser, loading } }: any) => ({
    user,
    currentUser,
    loading
  }),
  { getUser: USER, editUser: EDIT_USER }
)(translate('userUsers')(UserEdit));
