import axios from 'axios';

interface Register {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const REGISTER = async (value: Register) => axios.post(`${__API_URL__}/register`, { ...value });

export default REGISTER;
