import axios from 'axios';
import { ActionType } from '../reducers';
import { OrderBy, Filter } from '..';

export default function USERS(orderBy: OrderBy, filter: Filter, type = 'null') {
  return {
    types: [ActionType[type], ActionType.SET_USERS, null],
    payload: { orderBy, filter },
    callAPI: () => axios.post(`${__API_URL__}/users`, { filter, orderBy })
  };
}
