import axios from 'axios';
import { ActionType } from '../signUp/reducers';
import { ActionFunction } from '.';

const CURRENT_USER: ActionFunction<ActionType> = () => ({
  types: {
    REQUEST: ActionType.SET_LOADING_AND_CLEAR_USER,
    SUCCESS: ActionType.SET_CURRENT_USER,
    FAIL: ActionType.CLEAR_CURRENT_USER
  },
  APICall: () => axios.get(`${__API_URL__}/currentUser`)
});
export default CURRENT_USER;
