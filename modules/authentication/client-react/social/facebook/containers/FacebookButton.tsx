import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/fontawesome-free-brands';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '@restapp/look-client-react';

import { SocialButton, SocialButtonComponent } from '../../../index';
import './FacebookButton.css';

const facebookLogin = () => {
  window.location.href = '/auth/facebook';
};

const FacebookButton = ({ text }: SocialButtonComponent) => {
  return (
    <Button type="button" size="lg" onClick={facebookLogin} className="facebookBtn">
      <div className="iconContainer">
        <FontAwesomeIcon icon={faFacebookSquare as IconProp} className="facebookIcon" />
        <div className="separator" />
      </div>
      <div className="btnText">
        <span>{text}</span>
      </div>
    </Button>
  );
};

const FacebookLink = ({ text }: SocialButtonComponent) => {
  return (
    <Button color="link" onClick={facebookLogin} style={{ marginTop: 10 }}>
      {text}
    </Button>
  );
};

const FacebookIcon = () => (
  <div onClick={facebookLogin}>
    <FontAwesomeIcon icon={faFacebookSquare as IconProp} style={{ marginTop: 10, color: '#17427e', fontSize: 40 }} />
  </div>
);

const FacebookComponent: React.FunctionComponent<SocialButton> = ({ text, type }) => {
  switch (type) {
    case 'button':
      return <FacebookButton text={text} />;
    case 'link':
      return <FacebookLink text={text} />;
    case 'icon':
      return <FacebookIcon />;
    default:
      return <FacebookButton text={text} />;
  }
};

export default FacebookComponent;
