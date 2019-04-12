export { default as FacebookButton } from './social/facebook';
export { default as GitHubButton } from './social/github';
export { default as GoogleButton } from './social/google';
export { default as LinkedInButton } from './social/linkedin';

// TODO when create jwt and session module delete this variable
const authentication: any = {};

export default authentication;
export interface SocialButtonComponent {
  text?: string;
}
export interface SocialButton extends SocialButtonComponent {
  type: string;
}
