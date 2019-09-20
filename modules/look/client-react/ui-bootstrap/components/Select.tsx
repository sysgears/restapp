import React from 'react';
import { Input } from 'reactstrap';

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const Select = ({ children, ...props }: SelectProps) => {
  return (
    <Input {...props} type="select">
      {children}
    </Input>
  );
};

export default Select;
