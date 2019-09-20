import axios from 'axios';
import { ActionType, ActionFunction } from '.';

const deleteUser: ActionFunction<ActionType, number> = id => ({
  types: {
    SUCCESS: ActionType.DELETE_USER
  },
  APICall: () => axios.delete(`${__API_URL__}/deleteUser`, { data: { id } })
});

export default deleteUser;
