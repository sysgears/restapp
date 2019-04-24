import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import CardLabelStyles from '../styles/CardLabel';

interface CardLabelProps {
  children?: string;
  style?: ViewStyle | TextStyle;
}

const CardLabel = ({ children, style, ...props }: CardLabelProps) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children.toUpperCase()}
    </Text>
  );
};

const styles = StyleSheet.create(CardLabelStyles);

export default CardLabel;
