import axios from 'axios';
import { ActionType } from '../reducers';
import { User } from '..';

export default function ADD_USER(user: User) {
  return {
    types: [null, null, null] as ActionType[],
    callAPI: () => axios.post(`${__API_URL__}/addUser`, { ...user })
  };
}
