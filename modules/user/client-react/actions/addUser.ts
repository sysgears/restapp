import axios from 'axios';
import { User } from '..';

export default function ADD_USER(user: User) {
  return {
    types: {},
    APICall: () => axios.post(`${__API_URL__}/addUser`, { ...user })
  };
}
