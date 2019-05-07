export interface SocialButtonComponent {
  text?: string;
}

export interface SocialButton extends SocialButtonComponent {
  type: string;
}

export { default as LinkedInButton } from './linkedin';
export { default as GoogleButton } from './google';
export { default as GitHubButton } from './github';
export { default as FacebookButton } from './facebook';
