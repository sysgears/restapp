import axios from 'axios';
import { ActionType } from '../reducers';
import { ActionFunction } from '.';

const CURRENT_USER: ActionFunction = () => ({
  types: {
    REQUEST: ActionType.CLEAR_CURRENT_USER,
    SUCCESS: ActionType.SET_CURRENT_USER,
    FAIL: ActionType.CLEAR_CURRENT_USER
  },
  APICall: () => axios.get(`${__API_URL__}/currentUser`)
});
export default CURRENT_USER;
