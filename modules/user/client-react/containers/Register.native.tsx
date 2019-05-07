import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import RegisterView from '../components/RegisterView.native';

import settings from '../../../../settings';
import { REGISTER } from '../actions';
import { CommonProps, RegisterSubmitProps } from '../index.native';

interface RegisterProps extends CommonProps {
  register: (values: RegisterSubmitProps) => any;
}

interface RegisterState {
  isRegistered: boolean;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  public state = {
    isRegistered: false
  };

  public onSubmit = async (values: RegisterSubmitProps) => {
    const { t, register, navigation } = this.props;

    const data = await register(values);

    if (data.error) {
      throw new FormError(t('reg.errorMsg'), data.error);
    }

    if (!settings.auth.password.requireEmailConfirmation) {
      navigation.goBack();
    } else {
      this.setState({ isRegistered: true });
    }
  };

  public hideModal = () => {
    this.props.navigation.goBack();
  };

  public toggleModal = () => {
    this.setState(prevState => ({ isRegistered: !prevState.isRegistered }));
  };

  public render() {
    const { isRegistered } = this.state;
    return (
      <RegisterView {...this.props} isRegistered={isRegistered} hideModal={this.hideModal} onSubmit={this.onSubmit} />
    );
  }
}

const withConnect = connect(
  null,
  { register: REGISTER }
);

export default compose(
  translate('user'),
  withConnect(Register)
);