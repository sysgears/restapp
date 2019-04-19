import React from 'react';
import { StyleSheet, View, Text, Linking, Platform } from 'react-native';
import { WebBrowser } from 'expo';
import { translate } from '@restapp/i18n-client-react';
import { placeholderColor } from '@restapp/look-client-react-native/styles';
import { setItem } from '@restapp/core-common/clientStorage';

import LoginForm from './LoginForm.native';

import { CommonProps, LoginSubmitProps, ref } from '../index.native';

interface LoginViewProps extends CommonProps {
  onSubmit: (values: LoginSubmitProps) => void;
}

interface LinkingEvent {
  url: string;
}
class LoginView extends React.PureComponent<LoginViewProps> {
  public componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
  }

  public componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  public handleOpenURL = async ({ url }: LinkingEvent) => {
    const dataRegExp = /data=([^#]+)/;
    if (!url.match(dataRegExp)) {
      return;
    }

    // Extract stringified user string out of the URL
    const [, data] = url.match(dataRegExp);
    const decodedData = JSON.parse(decodeURI(data));

    if (decodedData.tokens) {
      await setItem('accessToken', decodedData.tokens.accessToken);
      await setItem('refreshToken', decodedData.tokens.refreshToken);

      await ref.authentication.doLogin();
    }

    if (Platform.OS === 'ios') {
      WebBrowser.dismissBrowser();
    }
  };

  public renderAvailableLogins = () => (
    <View style={styles.examplesArea}>
      <Text style={styles.title}>{this.props.t('login.cardTitle')}:</Text>
      <Text style={styles.exampleText}>admin@example.com: admin123</Text>
      <Text style={styles.exampleText}>user@example.com: user1234</Text>
    </View>
  );

  public render() {
    const { navigation, onSubmit } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.examplesContainer}>{this.renderAvailableLogins()}</View>
        <View style={styles.loginContainer}>
          <LoginForm onSubmit={onSubmit} navigation={navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10
  },
  examplesArea: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: placeholderColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    padding: 10
  },
  examplesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: placeholderColor
  },
  exampleText: {
    fontSize: 14,
    fontWeight: '400',
    color: placeholderColor
  },
  loginContainer: {
    flex: 3
  }
});

export default translate('user')(LoginView);
