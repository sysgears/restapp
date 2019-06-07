import axios from 'axios';
import { ActionType, ActionFunction } from '.';
import { OrderBy, Filter } from '../types';

const users: ActionFunction<ActionType, OrderBy, Filter, ActionType> = (
  orderBy: OrderBy,
  filter: Filter,
  type: ActionType
) => ({
  types: {
    REQUEST: type ? ActionType[type] : null,
    SUCCESS: ActionType.SET_USERS,
    FAIL: ActionType.CLEAR_USERS
  },
  payload: { orderBy, filter },
  APICall: () => axios.post(`${__API_URL__}/users`, { filter, orderBy })
});

export default users;