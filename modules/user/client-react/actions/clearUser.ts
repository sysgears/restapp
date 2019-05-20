import { ActionFunction } from '.';
import { ActionType } from '../reducers';

const CLEAR_USER: ActionFunction = () => ({
  type: ActionType.CLEAR_CURRENT_USER
});

export default CLEAR_USER;
