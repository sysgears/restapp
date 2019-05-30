import axios from 'axios';
import { ActionFunction, ActionType } from '.';

const USER: ActionFunction<ActionType, number> = id => ({
  types: {
    SUCCESS: ActionType.SET_USER
  },
  APICall: () => axios.get(`${__API_URL__}/user/${id}`)
});

export default USER;
