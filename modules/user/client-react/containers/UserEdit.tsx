import * as React from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import UserEditView from '../components/UserEditView';

import UserFormatter from '../helpers/UserFormatter';
import { User, CommonProps } from '..';
import { CommonProps as RNCommonProps } from '../index.native';
import { USER, EDIT_USER } from '../actions';

interface UserEditProps extends CommonProps, RNCommonProps {
  user: User;
  editUser: (value: User) => any;
  location: any;
  match: any;
  getUser?: (id: number) => void;
}

class UserEdit extends React.Component<UserEditProps> {
  public state = { ready: false };
  public async componentDidMount() {
    let id = 0;
    if (this.props.match) {
      id = this.props.match.params.id;
    } else if (this.props.navigation) {
      id = this.props.navigation.state.params.id;
    }
    await this.props.getUser(Number(id));
    this.setState({ ready: true });
  }
  public onSubmit = async (values: User) => {
    const { user, editUser, t, navigation, history } = this.props;

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

    if (navigation) {
      return navigation.goBack();
    }
  };

  public render() {
    return this.state.ready ? <UserEditView onSubmit={this.onSubmit} {...this.props} /> : null;
  }
}

export default translate('user')(
  connect(
    ({ user: { user } }: any) => ({
      user
    }),
    { getUser: USER, editUser: EDIT_USER }
  )(UserEdit)
);
