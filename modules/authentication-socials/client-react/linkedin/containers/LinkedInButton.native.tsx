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

import { SocialButton, SocialButtonComponent } from '../..';
import buildRedirectUrlForMobile from '../../helpers';

const linkedInLogin = () => {
  const url = buildRedirectUrlForMobile('linkedin');
  if (Platform.OS === 'ios') {
    WebBrowser.openBrowserAsync(url);
  } else {
    Linking.openURL(url);
  }
};

const LinkedInButton = ({ text }: SocialButtonComponent) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={linkedInLogin}>
      <View style={styles.btnIconContainer}>
        <FontAwesome name="linkedin-square" size={30} style={{ color: '#fff', marginLeft: 10 }} />
        <View style={styles.separator} />
      </View>
      <View style={styles.btnTextContainer}>
        <Text style={styles.btnText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const LinkedInLink = ({ text }: SocialButtonComponent) => {
  return (
    <TouchableOpacity onPress={linkedInLogin} style={styles.link}>
      <Text style={styles.linkText}>{text}</Text>
    </TouchableOpacity>
  );
};

const LinkedInIcon = () => (
  <View style={styles.iconWrapper}>
    <FontAwesome name="linkedin-square" size={45} style={{ color: '#3B5998' }} onPress={linkedInLogin} />
  </View>
);

const LinkedInComponent: React.FunctionComponent<SocialButton> = ({ type, text }) => {
  switch (type) {
    case 'button':
      return <LinkedInButton text={text} />;
    case 'link':
      return <LinkedInLink text={text} />;
    case 'icon':
      return <LinkedInIcon />;
    default:
      return <LinkedInButton text={text} />;
  }
};

const styles = StyleSheet.create({
  iconWrapper,
  linkText,
  link,
  buttonContainer: {
    ...buttonContainer,
    marginTop: 15,
    backgroundColor: '#0077b0'
  },
  separator,
  btnIconContainer,
  btnTextContainer,
  btnText
});

export default LinkedInComponent;
