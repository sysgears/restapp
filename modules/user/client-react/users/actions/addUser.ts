import axios from 'axios';
import { User } from '../../types';
import { ActionType, ActionFunction } from '.';

const addUser: ActionFunction<ActionType, User> = user => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/addUser`, { ...user })
});

export default addUser;
