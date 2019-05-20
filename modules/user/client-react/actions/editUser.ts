import axios from 'axios';
import { ActionFunction } from '.';
import { User } from '..';

const EDIT_USER: ActionFunction<User> = user => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/editUser`, { ...user })
});

export default EDIT_USER;
