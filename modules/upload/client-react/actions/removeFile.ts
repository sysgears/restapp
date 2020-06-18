import axios from 'axios';
import { ActionType } from '../reducers';
import { ActionFunction } from '.';

const removeFile: ActionFunction = id => ({
  types: {
    REQUEST: ActionType.UPLOAD_SET_LOADING,
    SUCCESS: ActionType.REMOVE_FILES_SUCCESS,
    FAIL: ActionType.REMOVE_FILES_FAIL
  },
  APICall: () => axios.delete(`${__API_URL__}/removeFile`, { data: { id } })
});
export default removeFile;
