import axios from 'axios';
import { ResetPasswordSubmitProps } from '..';

interface ResetPasswordProps extends ResetPasswordSubmitProps {
  token: string;
}

export default function RESET_PASSWORD(value: ResetPasswordProps) {
  return {
    types: {},
    APICall: () => axios.post(`${__API_URL__}/resetPassword`, { ...value })
  };
}
