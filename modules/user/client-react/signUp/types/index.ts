export interface LoginSubmitProps {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterSubmitProps {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ResetPasswordSubmitProps {
  password: string;
  passwordConfirmation: string;
}
export interface ForgotPasswordSubmitProps {
  email: string;
}
