import axios from 'axios';
import { RegisterSubmitProps } from '..';

export default function REGISTER(value: RegisterSubmitProps) {
  return {
    types: [null, null, null] as any,
    callAPI: () => axios.post(`${__API_URL__}/register`, { ...value })
  };
}
