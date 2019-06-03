import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { translate } from '@restapp/i18n-client-react';
import { getFiles, removeFile, uploadFiles } from '../actions';
import FileOperations from './FileOperations';
import { UploadProps } from '../types';

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
