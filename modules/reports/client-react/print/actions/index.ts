import axios from 'axios';
import { ActionType } from '../reducers';

const GET_REPORT_DATA = () => ({
  types: {
    SUCCESS: ActionType.SET_REPORT_DATA
  },
  APICall: () => axios.get(`${__API_URL__}/report`)
});
export default GET_REPORT_DATA;
