interface Action {
  type: string;
  payload: any;
}

interface InitialState {
  counter: number;
  errorCounter: { [key: string]: any };
  loadingCounter: boolean;
}

const initialState: InitialState = {
  counter: null,
  errorCounter: null,
  loadingCounter: false
};

export default function(state = initialState, { type, payload }: Action) {
  switch (type) {
    case ActionType.COUNTER_SET_LOADING:
      return { ...state, loadingCounter: true };

    case ActionType.GET_COUNTER_SUCCESS:
      return { ...state, loadingCounter: false, counter: payload };
    case ActionType.GET_COUNTER_FAIL:
      return { ...state, loadingCounter: false, errorCounter: payload };

    case ActionType.ADD_COUNTER_SUCCESS:
      return { ...state, loadingCounter: false };
    case ActionType.ADD_COUNTER_FAIL:
      return { ...state, loadingCounter: false, errorCounter: payload };

    default:
      return state;
  }
}

export enum ActionType {
  COUNTER_SET_LOADING = 'COUNTER_SET_LOADING',
  GET_COUNTER_FAIL = 'GET_COUNTER_FAIL',
  GET_COUNTER_SUCCESS = 'GET_COUNTER_SUCCESS',
  ADD_COUNTER_SUCCESS = 'ADD_COUNTER_SUCCESS',
  ADD_COUNTER_FAIL = 'ADD_COUNTER_FAIL'
}
