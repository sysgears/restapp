import { User } from '..';

export enum ActionType {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER'
}

export interface UserModuleState {
  currentUser: User;
}

export type UserModuleAction<V = UserModuleState> = (props: UserModuleActionProps<V>) => void;

export interface UserModuleActionProps<V> {
  type: ActionType | ActionType[];
  payload?: V;
  promise?: () => Promise<any>;
  [key: string]: any;
}

const defaultState: UserModuleState = {
  currentUser: null
};

export default function(state = defaultState, action: UserModuleActionProps<UserModuleState>) {
  switch (action.type) {
    case ActionType.CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null
      };
    case ActionType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };

    default:
      return state;
  }
}
