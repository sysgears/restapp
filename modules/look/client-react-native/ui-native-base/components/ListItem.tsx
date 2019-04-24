import React from 'react';
import { ListItem as NBListItem } from 'native-base';
import { GestureResponderEvent } from 'react-native';

interface ListItemProps {
  onClick?: (e: GestureResponderEvent) => void;
  onPress?: (e: GestureResponderEvent) => void;
  children?: React.ReactNode;
  style?: any;
}

const ListItem = ({ children, onPress, onClick, ...props }: ListItemProps) => {
  return (
    <NBListItem {...props} onPress={onPress || onClick}>
      {children}
    </NBListItem>
  );
};

export default ListItem;
