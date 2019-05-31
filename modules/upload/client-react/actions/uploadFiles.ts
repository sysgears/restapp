import axios from 'axios';
import { ImageFile } from 'react-dropzone';

import { ActionType } from '../reducers';
import { ActionFunction } from '.';

const UPLOAD_FILES: ActionFunction = (files: ImageFile[]) => ({
  types: {
    REQUEST: ActionType.UPLOAD_SET_LOADING,
    SUCCESS: ActionType.UPLOAD_FILES_SUCCESS,
    FAIL: ActionType.UPLOAD_FILES_FAIL
  },
  APICall: () => {
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    files.forEach(file => formData.append('fileInput', file));
    return axios.post(`${__API_URL__}/uploadFiles`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
});
export default UPLOAD_FILES;
