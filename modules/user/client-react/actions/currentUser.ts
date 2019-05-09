import axios from 'axios';
import { ActionType } from '../reducers';

export default function CURRENT_USER() {
  return {
    types: [null, ActionType.SET_CURRENT_USER, ActionType.CLEAR_CURRENT_USER],
    callAPI: (client: (request: () => Promise<any>) => any) =>
      client ? client(() => axios.get(`${__API_URL__}/currentUser`)) : axios.get(`${__API_URL__}/currentUser`)
  };
}
