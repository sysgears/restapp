import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { translate } from '@restapp/i18n-client-react';
import { FormError } from '@restapp/forms-client-react';
import ResetPasswordView from '../components/ResetPasswordView.native';
import { RESET_PASSWORD } from '../actions';
import { CommonProps, ResetPasswordSubmitProps } from '../index.native';

interface Token {
  token: string;
}

interface ResetPasswordProps extends CommonProps {
  resetPassword: (value: ResetPasswordSubmitProps & any) => void;
  match: any;
}

const ResetPassword: React.FunctionComponent<ResetPasswordProps> = props => {
  const { t, resetPassword, navigation, match } = props;

  const onSubmit = async (values: ResetPasswordSubmitProps) => {
    try {
      await resetPassword({ ...values, token: match.params.token });
    } catch (e) {
      throw new FormError(t('resetPass.errorMsg'), e);
    }
    navigation.navigate('Login');
  };

  return <ResetPasswordView {...props} onSubmit={onSubmit} />;
};

const ResetPasswordWithConnect = compose(
  translate('user'),

  connect(
    _state => ({}),
    dispatch => ({
      resetPassword: (values: ResetPasswordSubmitProps & Token) =>
        dispatch({
          type: null,
          request: () => RESET_PASSWORD(values)
        })
    })
  )(ResetPassword)
);

export default ResetPasswordWithConnect;
