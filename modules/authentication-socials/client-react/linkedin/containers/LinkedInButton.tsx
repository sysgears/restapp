import React from 'react';
import { faLinkedin } from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '@restapp/look-client-react';

import { SocialButtonComponent, SocialButton } from '../..';
import './LinkedInButton.css';

const linkedInLogin = () => {
  window.location.href = '/auth/linkedin';
};

const LinkedInButton = ({ text }: SocialButtonComponent) => {
  return (
    <Button type="button" size="lg" onClick={linkedInLogin} className="linkedInBtn">
      <div className="iconContainer">
        <FontAwesomeIcon icon={faLinkedin as IconProp} className="linkedInIcon" />
        <div className="separator" />
      </div>
      <div className="btnText">
        <span>{text}</span>
      </div>
    </Button>
  );
};

const LinkedInLink = ({ text }: SocialButtonComponent) => {
  return (
    <Button color="link" onClick={linkedInLogin} style={{ marginTop: 10 }}>
      {text}
    </Button>
  );
};

const LinkedInIcon = () => (
  <div onClick={linkedInLogin}>
    <FontAwesomeIcon icon={faLinkedin as IconProp} style={{ marginTop: 10, color: '#3B5998', fontSize: 40 }} />
  </div>
);

const LinkedInComponent: React.FunctionComponent<SocialButton> = ({ text, type }) => {
  switch (type) {
    case 'button':
      return <LinkedInButton text={text} />;
    case 'link':
      return <LinkedInLink text={text} />;
    case 'icon':
      return <LinkedInIcon />;
    default:
      return <LinkedInButton text={text} />;
  }
};

export default LinkedInComponent;
