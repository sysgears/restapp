import REGISTER from './register';
import LOGIN from './login';
import CURRENT_USER from './currentUser';
import CLEAR_USER from './clearUser';
import USERS from './users';
import USER from './user';
import DELETE_USER from './deleteUser';
import EDIT_USER from './editUser';
import ADD_USER from './addUser';
import RESET_PASSWORD from './resetPassword';
import FORGOT_PASSWORD from './forgotPassword';
import { ActionType } from '../reducers';

interface Types {
  REQUEST?: ActionType;
  SUCCESS?: ActionType;
  FAIL?: ActionType;
}
interface ActionCreator {
  type?: ActionType;
  types?: Types;
  APICall?: () => Promise<any>;
  payload?: any;
}

/**
 *
 * Action description function that will be processed further by redux middleware.
 * Must return an object with a @type property if the @APICall property is not in the action.
 * If there is an @APICall property then @types property must also be returned.
 *
 */
export type ActionFunction<P = null, P2 = null, P3 = null> = (param?: P, param2?: P2, param3?: P3) => ActionCreator;

export {
  REGISTER,
  LOGIN,
  CURRENT_USER,
  CLEAR_USER,
  USERS,
  USER,
  DELETE_USER,
  EDIT_USER,
  ADD_USER,
  RESET_PASSWORD,
  FORGOT_PASSWORD
};
