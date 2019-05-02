import { User } from '..';

export enum ActionType {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER',
  SET_LOADING = 'SET_LOADING',
  SET_USER = 'SET_USER'
}

export interface UserModuleState {
  currentUser: User;
  loading: boolean;
  user: User;
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
  user: null
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
        currentUser: action.payload,
        loading: false
      };

    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}
