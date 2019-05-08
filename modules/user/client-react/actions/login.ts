import axios from 'axios';
import { LoginSubmitProps } from '..';
import { ActionType } from '../reducers';

export default function LOGIN(value: LoginSubmitProps) {
  return {
    types: [null, ActionType.SET_CURRENT_USER, ActionType.CLEAR_CURRENT_USER],
    callAPI: (client: (request: () => Promise<any>) => any) =>
      client
        ? client(() => axios.post(`${__API_URL__}/login`, { ...value }))
        : axios.post(`${__API_URL__}/login`, { ...value })
  };
}
