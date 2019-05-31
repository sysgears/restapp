import React from 'react';
import { ImageFile } from 'react-dropzone';

import UploadView from '../components/UploadView';
import { UploadProps } from './Upload';

const FileOperations = (props: UploadProps) => {
  const { getFiles: getAllFiles, removeFile: removeFileById, uploadFiles: upload } = props;
  const handleUploadFiles = async (filesList: ImageFile[]) => {
    await upload(filesList);
    await getAllFiles();
  };

  const handleRemoveFile = async (id: number) => {
    await removeFileById(id);
    await getAllFiles();
  };

  return <UploadView {...props} handleRemoveFile={handleRemoveFile} handleUploadFiles={handleUploadFiles} />;
};

export default FileOperations;
