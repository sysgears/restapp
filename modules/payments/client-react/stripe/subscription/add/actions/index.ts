import axios from 'axios';
import { ActionType } from '../reducer';

interface ActionCreator<AT> {
  types: { [key: string]: AT };
  APICall: () => Promise<any>;
}

type ActionFunction<AT> = (card: any) => ActionCreator<AT>;

export const addSubscription: ActionFunction<ActionType> = card => ({
  types: {
    REQUEST: ActionType.START_LOADING,
    SUCCESS: ActionType.FINISH_LOADING,
    FAIL: ActionType.FINISH_LOADING
  },
  APICall: () => axios.post(`${__API_URL__}/addStripeSubscription`, { card })
});
