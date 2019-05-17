import axios from 'axios';
import { ForgotPasswordSubmitProps } from '..';

export default function FORGOT_PASSWORD(value: ForgotPasswordSubmitProps) {
  return {
    types: {},
    APICall: () => axios.post(`${__API_URL__}/forgotPassword`, { value })
  };
}
