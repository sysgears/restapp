import axios from 'axios';
import { ActionType } from '../reducers';
import { User } from '..';

export default function ADD_USER(user: User) {
  return {
    types: [null, ActionType.SET_CURRENT_USER, ActionType.CLEAR_CURRENT_USER],
    callAPI: () => axios.post(`${__API_URL__}/addUser`, { ...user })
  };
}
