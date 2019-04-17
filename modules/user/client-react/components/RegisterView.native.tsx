import React from 'react';
import { Button, primary } from '@restapp/look-client-react-native';
import { View, Text, StyleSheet } from 'react-native';
import { TranslateFunction, translate } from '@restapp/i18n-client-react';

import RegisterForm from '../components/RegisterForm';

import { RegisterSubmitProps } from '../index.native';

interface RegisterViewProps {
  t: TranslateFunction;
  onSubmit: (values: RegisterSubmitProps) => void;
  isRegistered: boolean;
  hideModal: () => void;
}

class RegisterView extends React.PureComponent<RegisterViewProps> {
  public renderModal = () => {
    const { t, hideModal } = this.props;
    return (
      <View style={styles.modalWrapper}>
        <Text style={styles.modalTitle}>{t('reg.confirmationMsgTitle')}</Text>
        <Text style={styles.modalBody}>{t('reg.confirmationMsgBody')}</Text>
        <View style={styles.button}>
          <Button onPress={hideModal} type={primary}>
            {t('reg.confirmationBtn')}
          </Button>
        </View>
      </View>
    );
  };

  public render() {
    const { onSubmit, isRegistered } = this.props;
    return (
      <View style={styles.container}>{isRegistered ? this.renderModal() : <RegisterForm onSubmit={onSubmit} />}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 20
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalBody: {
    fontSize: 16,
    marginBottom: 20
  },
  button: {
    flex: 1,
    paddingTop: 10
  }
});

export default translate('user')(RegisterView);
