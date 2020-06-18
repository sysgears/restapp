import axios from 'axios';
import { ActionType } from '../reducers';
import { ActionFunction } from '.';

const getFiles: ActionFunction = () => ({
  types: {
    REQUEST: ActionType.UPLOAD_SET_LOADING,
    SUCCESS: ActionType.GET_FILES_SUCCESS,
    FAIL: ActionType.GET_FILES_FAIL
  },
  APICall: () => axios.get(`${__API_URL__}/getFiles`)
});
export default getFiles;
