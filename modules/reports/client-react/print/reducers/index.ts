export interface ActionProps {
  type: ActionType | ActionType[];
  payload?: any;
  APICall?: () => Promise<any>;
  [key: string]: any;
}

export enum ActionType {
  SET_REPORT_DATA = 'SET_REPORT_DATA',
  CLEAR_REPORT_DATA = 'CLEAR_REPORT_DATA'
}

export interface ReportDataState {
  reportData: any[];
}

const defaultState: ReportDataState = {
  reportData: []
};

export default function(state = defaultState, action: ActionProps) {
  switch (action.type) {
    case ActionType.SET_REPORT_DATA:
      return {
        ...state,
        reportData: action.payload
      };

    case ActionType.CLEAR_REPORT_DATA:
      return {
        ...state,
        reportData: null
      };

    default:
      return state;
  }
}
