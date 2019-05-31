import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { ImageFile } from 'react-dropzone';
import { ActionFunction, getFiles, removeFile, uploadFiles } from '../actions';
import FileOperations from './FileOperations';

export interface UploadCommonProps {
  t: TranslateFunction;
  files: ImageFile[];
  error: { [key: string]: any };
  loading: boolean;
}

export interface UploadProps extends UploadCommonProps {
  getFiles: ActionFunction;
  removeFile: (id: number) => ActionFunction;
  uploadFiles: (filesList: ImageFile[]) => ActionFunction;
}

const Upload = (props: UploadProps) => {
  const { getFiles: getAllFiles, files } = props;

  useEffect(() => {
    if (!files) {
      getAllFiles();
    }
  }, []);

  return <FileOperations {...props} files={files} />;
};

const mapState = ({ uploadReducer: { files, loadingUpload: loading, errorUpload: error } }: any) => ({
  files,
  loading,
  error
});

const mapDispath = { getFiles, removeFile, uploadFiles };

export default compose(
  translate('upload'),
  connect(
    mapState,
    mapDispath
  )
)(Upload);
