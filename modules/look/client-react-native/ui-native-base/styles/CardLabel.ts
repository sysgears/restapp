import { ViewStyle, TextStyle } from 'react-native';

interface Styles {
  [key: string]: ViewStyle | TextStyle;
}

const CardLabelStyles: Styles = {
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#686b70'
  }
};

export default CardLabelStyles;
