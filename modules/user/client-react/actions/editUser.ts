import axios from 'axios';
import { User } from '..';

export default function EDIT_USER(user: User) {
  return {
    types: {},
    APICall: () => axios.post(`${__API_URL__}/editUser`, { ...user })
  };
}
