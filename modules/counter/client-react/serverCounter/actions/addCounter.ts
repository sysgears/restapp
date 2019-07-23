import axios from 'axios';
import { ActionType } from '../reducers';
import { ActionFunction } from '.';

const addCounter: ActionFunction = (amount: number) => ({
  types: {
    REQUEST: ActionType.COUNTER_SET_LOADING,
    SUCCESS: ActionType.ADD_COUNTER_SUCCESS,
    FAIL: ActionType.ADD_COUNTER_FAIL
  },
  APICall: () => axios.post(`${__API_URL__}/addCounter`, { body: { amount } })
});
export default addCounter;
