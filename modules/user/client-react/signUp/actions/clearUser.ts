import { ActionFunction, ActionType } from '.';

const CLEAR_USER: ActionFunction<ActionType> = () => ({
  type: ActionType.CLEAR_CURRENT_USER
});

export default CLEAR_USER;
