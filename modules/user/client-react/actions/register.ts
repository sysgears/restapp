import axios from 'axios';
import { ActionFunction } from '.';
import { RegisterSubmitProps } from '..';

const REGISTER: ActionFunction<RegisterSubmitProps> = value => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/register`, { ...value })
});

export default REGISTER;
