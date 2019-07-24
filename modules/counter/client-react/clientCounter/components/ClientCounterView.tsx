import React from 'react';
import styled from 'styled-components';

import { Button } from '@restapp/look-client-react';

const Section = styled.section`
  margin-bottom: 30px;
  text-align: center;
`;

interface ViewProps {
  text: string;
  children: any;
}

export const ClientCounterView = ({ text, children }: ViewProps) => (
  <Section>
    <p>{text}</p>
    {children}
  </Section>
);

interface ButtonProps {
  onClick: () => any;
  text: string;
}

export const ClientCounterButton = ({ onClick, text }: ButtonProps) => (
  <Button id="counter-client-button" color="primary" onClick={onClick}>
    {text}
  </Button>
);
