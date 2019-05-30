import axios from 'axios';
import { ActionFunction, ActionType } from '.';
import { ForgotPasswordSubmitProps } from '..';

const FORGOT_PASSWORD: ActionFunction<ActionType, ForgotPasswordSubmitProps> = value => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/forgotPassword`, { value })
});

export default FORGOT_PASSWORD;
