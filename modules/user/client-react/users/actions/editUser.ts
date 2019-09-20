import axios from 'axios';
import { ActionType, ActionFunction } from '.';
import { User } from '../../types';

const editUser: ActionFunction<ActionType, User> = user => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/editUser`, { ...user })
});

export default editUser;
