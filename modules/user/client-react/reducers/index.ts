import { User, UserRole } from '..';

export enum ActionType {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER',
  SET_LOADING = 'SET_LOADING',
  SET_USER = 'SET_USER',
  SET_USERS = 'SET_USERS',
  SET_ORDER_BY = 'SET_ORDER_BY',
  SET_FILTER = 'SET_FILTER'
}

export interface OrderBy {
  column: string;
  order: string;
}

export interface Filter {
  searchText: string;
  role: UserRole;
  isActive: boolean;
}

export interface UserModuleState {
  currentUser: User;
  loading: boolean;
  user: User;
  users: User[];
  orderBy: OrderBy;
  filter: Filter;
}

export type UserModuleAction = (props: UserModuleActionProps) => void;

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
  users: null,
  orderBy: { column: '', order: '' },
  filter: { searchText: '', role: null, isActive: true }
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
        loading: false,
        ...action.payload
      };
    case ActionType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.user,
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
        filter: action.payload
      };

    case ActionType.SET_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload
      };

    default:
      return state;
  }
}
