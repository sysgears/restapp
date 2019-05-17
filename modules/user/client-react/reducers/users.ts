import { User, OrderBy, Filter } from '..';
import { UserModuleActionProps, ActionType } from '.';

export interface UserModuleState {
  loading: boolean;
  user: User;
  users: User[];
  orderBy: OrderBy;
  filter: Filter;
}

const defaultState: UserModuleState = {
  loading: false,
  user: null,
  users: [],
  orderBy: { column: '', order: '' },
  filter: { searchText: '', role: '', isActive: true }
};

export default function(state = defaultState, action: UserModuleActionProps) {
  switch (action.type) {
    case ActionType.SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case ActionType.SET_USERS:
      return {
        ...state,
        users: action.payload
      };

    case ActionType.CLEAR_USERS:
      return {
        ...state,
        users: null
      };

    case ActionType.SET_FILTER:
      return {
        ...state,
        filter: action.payload && action.payload.filter
      };

    case ActionType.SET_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload && action.payload.orderBy
      };

    case ActionType.DELETE_USER:
      const users = state.users.filter(user => user.id !== action.payload.id);
      return {
        ...state,
        users
      };

    default:
      return state;
  }
}
