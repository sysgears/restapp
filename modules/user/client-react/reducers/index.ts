export { default as currentUserReducer } from './currentUser';
export { default as usersReducer } from './users';

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

export interface UserModuleActionProps {
  type: ActionType | ActionType[];
  payload?: any;
  request?: () => Promise<any>;
  [key: string]: any;
}
