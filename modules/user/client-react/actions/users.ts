import axios from 'axios';
import { ActionType } from '../reducers';
import { OrderBy, Filter } from '..';

export default function USERS(orderBy: OrderBy, filter: Filter, type?: ActionType) {
  return {
    types: {
      REQUEST: type ? ActionType[type] : null,
      SUCCESS: ActionType.SET_USERS,
      FAIL: ActionType.CLEAR_USERS
    },
    payload: { orderBy, filter },
    APICall: () => axios.post(`${__API_URL__}/users`, { filter, orderBy })
  };
}
