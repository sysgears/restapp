import React from 'react';
import { Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import CardTextStyles from '../styles/CardText';

interface CardTextProps {
  children?: string;
  style?: ViewStyle | TextStyle;
}

const CardText = ({ children, style, ...props }: CardTextProps) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create(CardTextStyles);

export default CardText;
