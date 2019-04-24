import React from 'react';
import { Input as RSInput } from 'reactstrap';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const Input = ({ children, ...props }: InputProps) => {
  return <RSInput {...props}>{children}</RSInput>;
};

export default Input;
