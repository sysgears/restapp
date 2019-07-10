export enum ActionType {
  START_LOADING = 'START_LOADING',
  FINISH_LOADING = 'FINISH_LOADING'
}

export interface AddSubscription {
  isLoading: boolean;
}

const defaultState: AddSubscription = {
  isLoading: false
};

export default function(state = defaultState, action: any) {
  switch (action.type) {
    case ActionType.START_LOADING:
      return {
        isLoading: true
      };

    case ActionType.FINISH_LOADING:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}
