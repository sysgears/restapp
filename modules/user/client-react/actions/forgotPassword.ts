import axios from 'axios';
import { ActionFunction } from '.';
import { ForgotPasswordSubmitProps } from '..';

const FORGOT_PASSWORD: ActionFunction<ForgotPasswordSubmitProps> = value => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/forgotPassword`, { value })
});

export default FORGOT_PASSWORD;
