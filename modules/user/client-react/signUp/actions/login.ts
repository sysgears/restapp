import axios from 'axios';
import { ActionFunction, ActionType } from '.';
import { LoginSubmitProps } from '../types';

const LOGIN: ActionFunction<ActionType, LoginSubmitProps> = value => ({
  types: {
    SUCCESS: ActionType.SET_CURRENT_USER
  },
  APICall: () => axios.post(`${__API_URL__}/login`, { ...value })
});

export default LOGIN;
