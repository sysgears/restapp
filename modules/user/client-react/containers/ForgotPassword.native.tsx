import React from 'react';

import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import ForgotPasswordView from '../components/ForgotPasswordView.native';
import { CommonProps, User } from '../index.native';
import { FORGOT_PASSWORD } from '../actions';

interface ForgotPasswordProps extends CommonProps {}

class ForgotPassword extends React.Component<ForgotPasswordProps> {
  public state = {
    sent: false
  };

  public onSubmit = async (values: User) => {
    const { t } = this.props;

    this.setState({ sent: true });
    try {
      await FORGOT_PASSWORD(values);
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
