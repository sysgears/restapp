import React from 'react';
import { compose } from 'redux';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import RegisterView from '../components/RegisterView';

import { UserComponentPropsNative, OnSubmitProps } from './Login.native';

import settings from '../../../../settings';

interface RegisterProps extends UserComponentPropsNative {
  register: (values: OnSubmitProps) => void;
}

interface RegisterState {
  isRegistered: boolean;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  public state = {
    isRegistered: false
  };

  public onSubmit = async (values: OnSubmitProps) => {
    const { t, register, navigation } = this.props;

    try {
      await register(values);
      if (!settings.auth.password.requireEmailConfirmation) {
        navigation.goBack();
      } else {
        this.setState({ isRegistered: true });
      }
    } catch (e) {
      throw new FormError(t('reg.errorMsg'), e);
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

export default compose(translate('user'))(Register);
