import axios from 'axios';
import { RegisterSubmitProps } from '..';
import { ActionType } from '../reducers';

export default function REGISTER(value: RegisterSubmitProps) {
  return {
    types: [null, ActionType.REGISTER, null],
    callAPI: (client: (request: () => Promise<any>) => void) =>
      client
        ? client(() => axios.post(`${__API_URL__}/register`, { ...value }))
        : axios.post(`${__API_URL__}/register`, { ...value })
  };
}
