import axios from 'axios';
import { ActionType, ActionFunction } from '.';
import { User } from '../../types';

const EDIT_USER: ActionFunction<ActionType, User> = user => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/editUser`, { ...user })
});

export default EDIT_USER;
