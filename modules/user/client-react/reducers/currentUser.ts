import { User } from '..';
import { UserModuleActionProps, ActionType } from '.';

export enum CurrentUserActionType {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER',
  SET_LOADING = 'SET_LOADING'
}

export interface CurrentUserState {
  currentUser: User;
  loading: boolean;
}

const defaultState: CurrentUserState = {
  currentUser: undefined,
  loading: false
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

    default:
      return state;
  }
}