import axios from 'axios';
import { RegisterSubmitProps } from '..';

const REGISTER = async (value: RegisterSubmitProps) => axios.post(`${__API_URL__}/register`, { ...value });

export default REGISTER;
