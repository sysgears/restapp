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

export { default as getFiles } from './getFiles';
export { default as removeFile } from './removeFile';
export { default as uploadFiles } from './uploadFiles';
