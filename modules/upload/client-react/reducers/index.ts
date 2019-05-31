import { ImageFile } from 'react-dropzone';

interface Action {
  type: string;
  payload: any;
}

interface InitialState {
  files: ImageFile[];
  errorUpload: { [key: string]: any };
  loadingUpload: boolean;
}

const initialState: InitialState = {
  files: null,
  errorUpload: null,
  loadingUpload: false
};

export default function(state = initialState, { type, payload }: Action) {
  switch (type) {
    case ActionType.UPLOAD_SET_LOADING:
      return { ...state, loadingUpload: true };

    case ActionType.GET_FILES_SUCCESS:
      return { ...state, loadingUpload: false, files: payload };
    case ActionType.GET_FILES_FAIL:
      return { ...state, loadingUpload: false, errorUpload: payload };

    case ActionType.REMOVE_FILES_SUCCESS:
      return { ...state, loadingUpload: false };
    case ActionType.REMOVE_FILES_FAIL:
      return { ...state, loadingUpload: false, errorUpload: payload };

    case ActionType.UPLOAD_FILES_SUCCESS:
      return { ...state, loadingUpload: false };
    case ActionType.UPLOAD_FILES_FAIL:
      return { ...state, loadingUpload: false, errorUpload: payload };

    default:
      return state;
  }
}

export enum ActionType {
  UPLOAD_SET_LOADING = 'UPLOAD_SET_LOADING',
  GET_FILES_FAIL = 'GET_FILES_FAIL',
  GET_FILES_SUCCESS = 'GET_FILES_SUCCESS',
  REMOVE_FILES_SUCCESS = 'REMOVE_FILES_SUCCESS',
  REMOVE_FILES_FAIL = 'REMOVE_FILES_FAIL',
  UPLOAD_FILES_SUCCESS = 'UPLOAD_FILES_SUCCESS',
  UPLOAD_FILES_FAIL = 'UPLOAD_FILES_FAIL'
}
