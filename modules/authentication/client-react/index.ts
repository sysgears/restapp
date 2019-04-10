export { default as FacebookButton } from './social/facebook';

export interface SocialButtonComponent {
  text?: string;
}
export interface SocialButton extends SocialButtonComponent {
  type: string;
}
