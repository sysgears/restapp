import * as React from 'react';
import * as ReactNative from 'react-native';
import { Platform, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Picker, Item } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { omit } from 'lodash';
import SelectStyles from '../styles/Select';

interface Option {
  value: string;
  label: string;
}
interface AntProps {
  okText: string;
  dismissText: string;
  cols: number;
  extra: string;
}

interface SelectProps extends ReactNative.PickerProps, AntProps {
  data: Option[];
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  selectedValue?: string;
  placeholder?: string;
  icon?: boolean;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  style?: ViewStyle | TextStyle;
}

const Select: React.FunctionComponent<SelectProps> = selectProps => {
  const {
    icon,
    iconName,
    iconColor,
    iconSize,
    data,
    onValueChange,
    selectedValue,
    value,
    onChange,
    style,
    itemStyle,
    placeholder = '...',
    ...props
  } = omit(selectProps, ['okText', 'dismissText', 'cols', 'extra']);
  return Platform.OS === 'ios' ? (
    <Item style={{ flex: 1 }}>
      {icon && (
        <FontAwesome name={iconName || 'filter'} size={iconSize || 20} style={{ color: `${iconColor || '#000'}` }} />
      )}
      <Picker
        placeholder={placeholder}
        style={style}
        onValueChange={onValueChange || onChange}
        selectedValue={selectedValue || value}
        {...props}
      >
        {data.map((option, idx) => (
          <Picker.Item key={idx} label={option.label} value={option.value} />
        ))}
      </Picker>
    </Item>
  ) : (
    <Item>
      <Picker
        style={[styles.androidPickerWrapper, style]}
        onValueChange={onValueChange || onChange}
        selectedValue={selectedValue || value}
        {...props}
      >
        {data.map((option, idx) => (
          <Picker.Item key={idx} label={option.label} value={option.value} />
        ))}
      </Picker>
    </Item>
  );
};

const styles = StyleSheet.create(SelectStyles);

export default Select;
