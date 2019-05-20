import * as React from 'react';
import * as ReactNative from 'react-native';
import { Item, Input, Icon } from 'native-base';
import { placeholderColor } from '../../styles';

interface SearchBarProps extends ReactNative.TextInputProps {}

const SearchBar = ({ ...props }: SearchBarProps) => {
  return (
    <Item>
      <Icon name="ios-search" />
      <Input placeholderTextColor={placeholderColor} {...props} />
    </Item>
  );
};

export default SearchBar;
