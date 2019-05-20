import axios from 'axios';
import { ActionFunction } from '.';
import { ActionType } from '../reducers';

const USER: ActionFunction<number> = id => ({
  types: {
    SUCCESS: ActionType.SET_USER
  },
  APICall: () => axios.get(`${__API_URL__}/user/${id}`)
});

export default USER;
