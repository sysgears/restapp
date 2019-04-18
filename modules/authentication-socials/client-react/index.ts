export { default as FacebookButton } from './facebook';
export { default as GitHubButton } from './github';
export { default as GoogleButton } from './google';
export { default as LinkedInButton } from './linkedin';
export { default as socialsConfig } from './config';

import ClientModule from '@restapp/module-client-react';

export interface SocialButtonComponent {
  text?: string;
}
export interface SocialButton extends SocialButtonComponent {
  type: string;
}
export default new ClientModule();
