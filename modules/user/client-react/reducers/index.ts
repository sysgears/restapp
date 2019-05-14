import { User, OrderBy, Filter } from '..';

export enum ActionType {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER',
  SET_LOADING = 'SET_LOADING',
  SET_USER = 'SET_USER',
  SET_USERS = 'SET_USERS',
  SET_ORDER_BY = 'SET_ORDER_BY',
  SET_FILTER = 'SET_FILTER',
  DELETE_USER = 'DELETE_USER'
}

export interface UserModuleState {
  currentUser: User;
  loading: boolean;
  user: User;
  users: User[];
  orderBy: OrderBy;
  filter: Filter;
}

export interface UserModuleActionProps {
  type: ActionType | ActionType[];
  payload?: any;
  request?: () => Promise<any>;
  [key: string]: any;
}

const defaultState: UserModuleState = {
  currentUser: null,
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

    case ActionType.CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        loading: false
      };

    case ActionType.SET_CURRENT_USER:
      const currentUser = action.payload && action.payload.errors ? null : action.payload.user || action.payload;
      return {
        ...state,
        currentUser,
        loading: false
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
