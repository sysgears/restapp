import axios from 'axios';
import { ActionType, ActionFunction } from '.';

const DELETE_USER: ActionFunction<ActionType, number> = id => ({
  types: {
    SUCCESS: ActionType.DELETE_USER
  },
  APICall: () => axios.delete(`${__API_URL__}/deleteUser`, { data: { id } })
});

export default DELETE_USER;
