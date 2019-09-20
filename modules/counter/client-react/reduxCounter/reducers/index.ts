const defaultState = {
  reduxCount: 1
};

export default function(state = defaultState, { type, payload }: { type: string; payload: number }) {
  switch (type) {
    case 'COUNTER_INCREMENT':
      return {
        ...state,
        reduxCount: state.reduxCount + payload
      };

    default:
      return state;
  }
}
