import axios from 'axios';
import { ActionType } from '../reducers';
import { ActionFunction } from '.';

const uploadFiles: ActionFunction = (files: any) => ({
  types: {
    REQUEST: ActionType.UPLOAD_SET_LOADING,
    SUCCESS: ActionType.UPLOAD_FILES_SUCCESS,
    FAIL: ActionType.UPLOAD_FILES_FAIL
  },

  APICall: () => {
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    files.forEach((file: any) => formData.append('fileInput', file));
    return axios.post(`${__API_URL__}/uploadFiles`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
});
export default uploadFiles;
