import axios from 'axios';
import { ActionFunction } from '.';
import { User } from '..';

const ADD_USER: ActionFunction<User> = user => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/addUser`, { ...user })
});

export default ADD_USER;
