import { User } from '..';

export enum ActionType {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER',
  SET_LOADING = 'SET_LOADING'
}

export interface UserModuleState {
  currentUser: User;
  loading: boolean;
}

export type UserModuleAction = (props: UserModuleActionProps) => void;

export interface UserModuleActionProps {
  type: ActionType | ActionType[];
  payload?: any;
  promise?: () => Promise<any>;
  [key: string]: any;
}

const defaultState: UserModuleState = {
  currentUser: null,
  loading: false
};

export default function(state = defaultState, action: UserModuleActionProps) {
  switch (action.type) {
    case ActionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ActionType.CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        ...action.payload
      };
    case ActionType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.login.user,
        ...action.payload
      };

    default:
      return state;
  }
}
