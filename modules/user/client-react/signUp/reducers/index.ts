import { User } from '../..';

export interface SignUpActionProps {
  type: ActionType | ActionType[];
  payload?: any;
  APICall?: () => Promise<any>;
  [key: string]: any;
}

export enum ActionType {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER',
  SET_LOADING_AND_CLEAR_USER = 'SET_LOADING_AND_CLEAR_USER'
}

export interface CurrentUserState {
  currentUser: User;
  loading: boolean;
}

const defaultState: CurrentUserState = {
  currentUser: undefined,
  loading: false
};

export default function(state = defaultState, action: SignUpActionProps) {
  switch (action.type) {
    case ActionType.SET_LOADING_AND_CLEAR_USER:
      return {
        ...state,
        currentUser: null,
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

    default:
      return state;
  }
}
