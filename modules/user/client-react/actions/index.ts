export { default as CURRENT_USER } from './currentUser';
import { ActionType } from '../reducers';

interface Types<AT> {
  REQUEST?: AT;
  SUCCESS?: AT;
  FAIL?: AT;
}
interface ActionCreator<AT = ActionType> {
  type?: AT;
  types?: Types<AT>;
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
export type ActionFunction<AT, P = null, P2 = null, P3 = null> = (
  param?: P,
  param2?: P2,
  param3?: P3
) => ActionCreator<AT>;
