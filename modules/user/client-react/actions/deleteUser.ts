import axios from 'axios';
import { ActionFunction } from '.';
import { ActionType } from '../reducers';

const DELETE_USER: ActionFunction<number> = id => ({
  types: {
    SUCCESS: ActionType.DELETE_USER
  },
  APICall: () => axios.delete(`${__API_URL__}/deleteUser`, { data: { id } })
});

export default DELETE_USER;
