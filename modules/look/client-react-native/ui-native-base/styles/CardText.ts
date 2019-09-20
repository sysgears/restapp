import { ViewStyle, TextStyle } from 'react-native';

interface Styles {
  [key: string]: ViewStyle | TextStyle;
}

const CardTextStyles: Styles = {
  text: {
    fontSize: 14
  }
};

export default CardTextStyles;
