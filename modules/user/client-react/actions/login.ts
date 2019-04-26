import axios from 'axios';
import { LoginSubmitProps } from '..';

const LOGIN = async (value: LoginSubmitProps) => axios.post(`${__API_URL__}/login`, { ...value });

export default LOGIN;
