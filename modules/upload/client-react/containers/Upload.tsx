import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { ImageFile } from 'react-dropzone';
import { ActionFunction, getFiles, removeFile, uploadFiles } from '../actions';
import UploadView from '../components/UploadView';

export interface UploadCommonProps {
  t: TranslateFunction;
  files: ImageFile[];
  error: { [key: string]: any };
  loading: boolean;
}

interface UploadProps extends UploadCommonProps {
  getFiles: ActionFunction;
  removeFile: (id: number) => ActionFunction;
  uploadFiles: (filesList: ImageFile[]) => ActionFunction;
}

const Upload = (props: UploadProps) => {
  const { getFiles: getAllFiles, files, removeFile: removeFileById, uploadFiles: upload } = props;

  useEffect(() => {
    if (!files) {
      getAllFiles();
    }
  }, []);

  const handleUploadFiles = async (filesList: ImageFile[]) => {
    await upload(filesList);
    await getAllFiles();
  };

  const handleRemoveFile = async (id: number) => {
    await removeFileById(id);
    await getAllFiles();
  };

  return (
    <UploadView {...props} files={files} handleUploadFiles={handleUploadFiles} handleRemoveFile={handleRemoveFile} />
  );
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
