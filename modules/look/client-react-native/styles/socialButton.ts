import { ViewStyle, TextStyle } from 'react-native';

const iconWrapper: ViewStyle = {
  alignItems: 'center',
  marginTop: 10
};

const linkText: TextStyle = {
  color: '#0056b3',
  fontSize: 16,
  fontWeight: '600'
};

const link: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10
};

const buttonContainer: ViewStyle = {
  height: 45,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#3769ae',
  borderRadius: 4
};
const separator: ViewStyle = {
  height: 30,
  width: 1.5,
  marginLeft: 10,
  backgroundColor: '#fff'
};
const btnIconContainer: ViewStyle = {
  flex: 2,
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row'
};
const btnTextContainer: ViewStyle = {
  flex: 5,
  justifyContent: 'center',
  alignItems: 'flex-start'
};
const btnText: TextStyle = {
  color: '#fff',
  fontSize: 16,
  fontWeight: '400'
};

export { iconWrapper, linkText, link, buttonContainer, separator, btnIconContainer, btnTextContainer, btnText };
