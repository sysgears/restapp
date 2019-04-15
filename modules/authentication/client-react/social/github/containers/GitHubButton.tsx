import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/fontawesome-free-brands';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '@restapp/look-client-react';

import { SocialButton, SocialButtonComponent } from '../../../index';
import './GitHubButton.css';

const githubLogin = () => {
  window.location.href = '/auth/github';
};

const GitHubButton = ({ text }: SocialButtonComponent) => {
  return (
    <Button type="button" size="lg" onClick={githubLogin} className="githubBtn">
      <div className="iconContainer">
        <FontAwesomeIcon icon={faGithubSquare as IconProp} className="githubIcon" />
        <div className="separator" />
      </div>
      <div className="btnText">
        <span>{text}</span>
      </div>
    </Button>
  );
};

const GitHubLink = ({ text }: SocialButtonComponent) => {
  return (
    <Button color="link" onClick={githubLogin} style={{ marginTop: 10 }}>
      {text}
    </Button>
  );
};

const GitHubIcon = () => (
  <div onClick={githubLogin}>
    <FontAwesomeIcon icon={faGithubSquare as IconProp} style={{ marginTop: 10, color: '#5f5e5e', fontSize: 40 }} />
  </div>
);

const GithubComponent: React.FunctionComponent<SocialButton> = ({ text, type }) => {
  switch (type) {
    case 'button':
      return <GitHubButton text={text} />;
    case 'link':
      return <GitHubLink text={text} />;
    case 'icon':
      return <GitHubIcon />;
    default:
      return <GitHubButton text={text} />;
  }
};

export default GithubComponent;
