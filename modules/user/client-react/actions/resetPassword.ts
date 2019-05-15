import axios from 'axios';
import { ResetPasswordSubmitProps } from '..';
import { ActionType } from '../reducers';

interface ResetPasswordProps extends ResetPasswordSubmitProps {
  token: string;
}

export default function RESET_PASSWORD(value: ResetPasswordProps) {
  return {
    types: [null, null, null] as ActionType[],
    APICall: () => axios.post(`${__API_URL__}/resetPassword`, { ...value })
  };
}
