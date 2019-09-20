import axios from 'axios';
import { ActionFunction, ActionType } from '.';
import { ResetPasswordSubmitProps } from '../types';

interface ResetPasswordProps extends ResetPasswordSubmitProps {
  token: string;
}

const resetPassword: ActionFunction<ActionType, ResetPasswordProps> = value => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/resetPassword`, { ...value })
});

export default resetPassword;
