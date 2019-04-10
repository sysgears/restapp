import React from 'react';
import { View, StyleSheet, Linking, TouchableOpacity, Text, Platform } from 'react-native';
import { WebBrowser } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import {
  iconWrapper,
  linkText,
  link,
  buttonContainer,
  separator,
  btnIconContainer,
  btnTextContainer,
  btnText
} from '@restapp/look-client-react-native/styles';

import { SocialButtonComponent, SocialButton } from '../../../index';
import buildRedirectUrlForMobile from '../../../helpers';

const googleLogin = () => {
  const url = buildRedirectUrlForMobile('google');
  if (Platform.OS === 'ios') {
    WebBrowser.openBrowserAsync(url);
  } else {
    Linking.openURL(url);
  }
};

const GoogleButton = ({ text }: SocialButtonComponent) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={googleLogin}>
      <View style={styles.btnIconContainer}>
        <FontAwesome name="google-plus-square" size={30} style={{ color: '#fff', marginLeft: 10 }} />
        <View style={styles.separator} />
      </View>
      <View style={styles.btnTextContainer}>
        <Text style={styles.btnText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const GoogleLink = ({ text }: SocialButtonComponent) => {
  return (
    <TouchableOpacity onPress={googleLogin} style={styles.link}>
      <Text style={styles.linkText}>{text}</Text>
    </TouchableOpacity>
  );
};

const GoogleIcon = () => (
  <View style={styles.iconWrapper}>
    <FontAwesome style={{ color: '#c43832' }} onPress={googleLogin} name="google-plus-square" size={45} />
  </View>
);

const GoogleComponent: React.FunctionComponent<SocialButton> = ({ type, text }) => {
  switch (type) {
    case 'button':
      return <GoogleButton text={text} />;
    case 'link':
      return <GoogleLink text={text} />;
    case 'icon':
      return <GoogleIcon />;
    default:
      return <GoogleButton text={text} />;
  }
};

const styles = StyleSheet.create({
  iconWrapper,
  linkText,
  link,
  buttonContainer: {
    ...buttonContainer,
    marginTop: 15,
    backgroundColor: '#c43832'
  },
  separator: {
    ...separator,
    backgroundColor: '#fff'
  },
  btnIconContainer,
  btnTextContainer,
  btnText
});

export default GoogleComponent;
