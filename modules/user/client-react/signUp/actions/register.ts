import axios from 'axios';
import { ActionFunction, ActionType } from '.';
import { RegisterSubmitProps } from '..';

const REGISTER: ActionFunction<ActionType, RegisterSubmitProps> = value => ({
  types: {},
  APICall: () => axios.post(`${__API_URL__}/register`, { ...value })
});

export default REGISTER;
