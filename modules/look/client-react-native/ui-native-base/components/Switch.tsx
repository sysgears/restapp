import React from 'react';
import { Switch as NBSwitch } from 'native-base';

interface SwitchProps {
  checked?: boolean;
  value: boolean;
  color?: string;
  onValueChange?: (value: boolean) => void;
  onChange?: (value: boolean) => void;
}

const Switch = ({ color, checked, value, onValueChange, onChange, ...props }: SwitchProps) => {
  return <NBSwitch onTintColor={color} value={value || checked} onValueChange={onValueChange || onChange} {...props} />;
};

export default Switch;
