import axios from 'axios';
import { ForgotPasswordSubmitProps } from '..';
import { ActionType } from '../reducers';

export default function FORGOT_PASSWORD(value: ForgotPasswordSubmitProps) {
  return {
    types: [null, null, null] as ActionType[],
    APICall: () => axios.post(`${__API_URL__}/forgotPassword`, { value })
  };
}
