import { ActionFunction, ActionType } from '.';

const clearUser: ActionFunction<ActionType> = () => ({
  type: ActionType.CLEAR_CURRENT_USER
});

export default clearUser;
