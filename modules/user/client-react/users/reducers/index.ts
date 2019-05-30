import { User } from '../..';
import { OrderBy, Filter } from '..';

export enum ActionType {
  SET_LOADING = 'SET_LOADING',
  SET_USER = 'SET_USER',
  SET_USERS = 'SET_USERS',
  CLEAR_USERS = 'CLEAR_USERS',
  SET_ORDER_BY = 'SET_ORDER_BY',
  SET_FILTER = 'SET_FILTER',
  DELETE_USER = 'DELETE_USER'
}

export interface UsersActionProps {
  type: ActionType | ActionType[];
  payload?: any;
  APICall?: () => Promise<any>;
  [key: string]: any;
}

export interface UserModuleState {
  usersLoading: boolean;
  user: User;
  users: User[];
  orderBy: OrderBy;
  filter: Filter;
}

const defaultState: UserModuleState = {
  usersLoading: false,
  user: null,
  users: [],
  orderBy: { column: '', order: '' },
  filter: { searchText: '', role: '', isActive: true }
};

export default function(state = defaultState, action: UsersActionProps) {
  switch (action.type) {
    case ActionType.SET_LOADING:
      return {
        ...state,
        usersLoading: true
      };

    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
        usersLoading: false
      };

    case ActionType.SET_USERS:
      return {
        ...state,
        users: action.payload,
        usersLoading: false
      };

    case ActionType.CLEAR_USERS:
      return {
        ...state,
        users: null,
        usersLoading: false
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
