import axios from 'axios';
import { ForgotPasswordSubmitProps } from '..';

interface ResetPasswordProps extends ForgotPasswordSubmitProps {
  token: string;
}

const RESET_PASSWORD = async (value: ResetPasswordProps) => axios.post(`${__API_URL__}/resetPassword`, { ...value });

export default RESET_PASSWORD;
