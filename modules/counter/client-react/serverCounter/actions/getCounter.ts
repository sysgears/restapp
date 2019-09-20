import axios from 'axios';
import { ActionType } from '../reducers';
import { ActionFunction } from '.';

const getCounter: ActionFunction = () => ({
  types: {
    REQUEST: ActionType.COUNTER_SET_LOADING,
    SUCCESS: ActionType.GET_COUNTER_SUCCESS,
    FAIL: ActionType.GET_COUNTER_FAIL
  },
  APICall: () => axios.get(`${__API_URL__}/getCounter`)
});
export default getCounter;
