import { User } from '..';

export enum ActionType {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER',
  SET_LOADING = 'SET_LOADING',
  REGISTER = 'REGISTER'
}

export interface UserModuleState {
  currentUser: User;
  loading: boolean;
  register: any;
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
  register: null
};

export default function(state = defaultState, action: UserModuleActionProps) {
  switch (action.type) {
    case ActionType.REGISTER:
      return {
        ...state,
        register: action.payload
      };

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
      const currentUser = action.payload.errors ? null : (action.payload.user && action.payload) || action.payload;
      return {
        ...state,
        currentUser,
        loading: false
      };

    default:
      return state;
  }
}
