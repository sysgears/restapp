import axios from 'axios';
import { ActionFunction, ActionType } from '.';
import { ForgotPasswordSubmitProps } from '../types';

const forgotPassword: ActionFunction<ActionType, ForgotPasswordSubmitProps> = value => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/forgotPassword`, { value })
});

export default forgotPassword;
