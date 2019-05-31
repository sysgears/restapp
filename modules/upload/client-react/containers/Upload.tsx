import React, { Component } from 'react';
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

class Upload extends Component<UploadProps> {
  public componentDidMount() {
    const { files, getFiles: getAllFiles } = this.props;
    if (!files) {
      getAllFiles();
    }
  }

  public render() {
    return <FileOperations {...this.props} />;
  }
}

const mapState = ({ uploadReducer: { files, loadingUpload: loading, errorUpload: error } }: any) => ({
  files,
  loading,
  error
});

const mapDispath = { getFiles, removeFile, uploadFiles };

export default compose(
  connect(
    mapState,
    mapDispath
  ),
  translate('upload')
)(Upload);
