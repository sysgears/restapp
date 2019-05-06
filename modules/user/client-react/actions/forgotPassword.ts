import axios from 'axios';
import { ForgotPasswordSubmitProps } from '..';

const FORGOT_PASSWORD = async (value: ForgotPasswordSubmitProps) =>
  axios.post(`${__API_URL__}/forgotPassword`, { value });

export default FORGOT_PASSWORD;
