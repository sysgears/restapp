import axios from 'axios';
import { ActionType } from '../reducers';

export default function CURRENT_USER() {
  return {
    types: {
      REQUEST: ActionType.CLEAR_CURRENT_USER,
      SUCCESS: ActionType.SET_CURRENT_USER,
      FAIL: ActionType.CLEAR_CURRENT_USER
    },
    APICall: () => axios.get(`${__API_URL__}/currentUser`)
  };
}
