import axios from 'axios';
import { ActionType } from '../reducers';
import { User } from '..';

export default function EDIT_USER(user: User) {
  return {
    types: [null, null, null] as ActionType[],
    callAPI: () => axios.post(`${__API_URL__}/editUser`, { ...user })
  };
}
