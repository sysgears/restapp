import axios from 'axios';
import { ResetPasswordSubmitProps } from '..';

interface ResetPasswordProps extends ResetPasswordSubmitProps {
  token: string;
}

const RESET_PASSWORD = async (value: ResetPasswordProps) => axios.post(`${__API_URL__}/resetPassword`, { ...value });

export default RESET_PASSWORD;
