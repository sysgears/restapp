import axios from 'axios';
import { ActionType } from '../reducers';
import { OrderBy, Filter } from '..';

export default function USERS(orderBY: OrderBy, filter: Filter, type = 'SET_LOADING') {
  return {
    types: [ActionType[type], ActionType.SET_USERS, null],
    payload: { orderBY, filter },
    callAPI: () => axios.get(`${__API_URL__}/users`, { params: { filter, orderBY } })
  };
}
