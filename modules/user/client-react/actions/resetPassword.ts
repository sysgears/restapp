import axios from 'axios';

interface ResetPasswordProps {
  password: string;
  passwordConfirmation: string;
  token: string;
}

const RESET_PASSWORD = async (value: ResetPasswordProps) => axios.post(`${__API_URL__}/resetPassword`, { ...value });

export default RESET_PASSWORD;
