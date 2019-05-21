import axios from 'axios';
import { ActionFunction } from '.';
import { LoginSubmitProps } from '..';
import { ActionType } from '../reducers';

const LOGIN: ActionFunction<LoginSubmitProps> = value => ({
  types: {
    SUCCESS: ActionType.SET_CURRENT_USER
  },
  APICall: () => axios.post(`${__API_URL__}/login`, { ...value })
});

export default LOGIN;
