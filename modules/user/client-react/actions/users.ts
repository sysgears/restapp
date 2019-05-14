import axios from 'axios';
import { ActionType } from '../reducers';
import { OrderBy, Filter } from '..';

export default function USERS(orderBy: OrderBy, filter: Filter, type?: ActionType) {
  return {
    types: [type ? ActionType[type] : null, ActionType.SET_USERS, null],
    payload: { orderBy, filter },
    APICall: () => axios.post(`${__API_URL__}/users`, { filter, orderBy })
  };
}
