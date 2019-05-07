import axios from 'axios';
import { RegisterSubmitProps } from '..';
import { ActionType } from '../reducers';

export default function REGISTER(value: RegisterSubmitProps) {
  return {
    types: [null, ActionType.REGISTER, null],
    callAPI: async () => axios.post(`${__API_URL__}/register`, { ...value })
  };
}
