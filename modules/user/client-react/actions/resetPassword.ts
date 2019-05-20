import axios from 'axios';
import { ActionFunction } from '.';
import { ResetPasswordSubmitProps } from '..';

interface ResetPasswordProps extends ResetPasswordSubmitProps {
  token: string;
}

const RESET_PASSWORD: ActionFunction<ResetPasswordProps> = value => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/resetPassword`, { ...value })
});

export default RESET_PASSWORD;
