export { default as FacebookButton } from './social/facebook';
export { default as GitHubButton } from './social/github';
export { default as GoogleButton } from './social/google';
export { default as LinkedInButton } from './social/linkedin';

export interface SocialButtonComponent {
  text?: string;
}
export interface SocialButton extends SocialButtonComponent {
  type: string;
}
