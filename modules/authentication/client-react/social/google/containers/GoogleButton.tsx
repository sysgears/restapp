import React from 'react';
import faGooglePlusSquare from '@fortawesome/fontawesome-free-brands/faGooglePlusSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '@restapp/look-client-react';

import { SocialButtonComponent, SocialButton } from '../..';
import './GoogleButton.css';

const googleLogin = () => {
  window.location.href = '/api/auth/google';
};

const GoogleButton = ({ text }: SocialButtonComponent) => {
  return (
    <Button type="button" size="lg" onClick={googleLogin} className="googleBtn">
      <div className="iconContainer">
        <FontAwesomeIcon icon={faGooglePlusSquare as IconProp} className="googleIcon" />
        <div className="separator" />
      </div>
      <div className="btnText">
        <span>{text}</span>
      </div>
    </Button>
  );
};

const GoogleLink = ({ text }: SocialButtonComponent) => {
  return (
    <Button color="link" onClick={googleLogin} style={{ marginTop: 10 }}>
      {text}
    </Button>
  );
};

const GoogleIcon = () => (
  <div onClick={googleLogin}>
    <FontAwesomeIcon icon={faGooglePlusSquare as IconProp} style={{ marginTop: 10, color: '#c43832', fontSize: 40 }} />
  </div>
);

const GoogleComponent: React.FunctionComponent<SocialButton> = ({ type, text }) => {
  switch (type) {
    case 'button':
      return <GoogleButton text={text} />;
    case 'link':
      return <GoogleLink text={text} />;
    case 'icon':
      return <GoogleIcon />;
    default:
      return <GoogleButton text={text} />;
  }
};

export default GoogleComponent;
