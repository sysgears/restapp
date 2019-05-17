import axios from 'axios';
import { RegisterSubmitProps } from '..';

export default function REGISTER(value: RegisterSubmitProps) {
  return {
    types: {},
    APICall: () => axios.post(`${__API_URL__}/register`, { ...value })
  };
}
