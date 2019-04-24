import React from 'react';

import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import ForgotPasswordView from '../components/ForgotPasswordView.native';
import { CommonProps, User } from '../index.native';

interface ForgotPasswordProps extends CommonProps {
  forgotPassword: (values: User) => void;
}

class ForgotPassword extends React.Component<ForgotPasswordProps> {
  public state = {
    sent: false
  };

  public onSubmit = async (values: User) => {
    const { forgotPassword, t } = this.props;

    this.setState({ sent: true });
    try {
      await forgotPassword(values);
    } catch (e) {
      throw new FormError(t('forgotPass.errorMsg'), e);
    }
  };

  public render() {
    const { sent } = this.state;

    return <ForgotPasswordView {...this.props} sent={sent} onSubmit={this.onSubmit} />;
  }
}

export default translate('user')(ForgotPassword);
