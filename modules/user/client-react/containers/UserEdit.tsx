import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { pick } from 'lodash';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import UserEditView from '../components/UserEditView';

import UserFormatter from '../helpers/UserFormatter';
import { User, CommonProps } from '..';
import { CommonProps as RNCommonProps } from '../index.native';
import { UserModuleState } from '../reducers';
import { USER, EDIT_USER } from '../actions';

interface UserEditProps extends CommonProps, RNCommonProps {
  user: User;
  editUser: (value: User) => void;
  location: any;
  match: any;
  getUser?: (id: number) => void;
}

class UserEdit extends React.Component<UserEditProps> {
  public componentDidMount() {
    let id = 0;
    if (this.props.match) {
      id = this.props.match.params.id;
    } else if (this.props.navigation) {
      id = this.props.navigation.state.params.id;
    }
    this.props.getUser(Number(id));
  }
  public onSubmit = async (values: User) => {
    const { user, editUser, t, navigation, history } = this.props;
    let userValues = pick(values, ['username', 'email', 'role', 'isActive', 'password']) as User;

    userValues.profile = pick(values.profile, ['firstName', 'lastName']);

    userValues = UserFormatter.trimExtraSpaces(userValues) as User;

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

  public render() {
    return <UserEditView onSubmit={this.onSubmit} {...this.props} />;
  }
}

export default compose(
  translate('user'),
  connect(
    ({ user }: UserModuleState) => ({
      user
    }),
    { getUser: USER, editUser: EDIT_USER }
  )(UserEdit)
);
