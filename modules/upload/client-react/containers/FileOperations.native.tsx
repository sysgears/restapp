import React, { ComponentType } from 'react';
import path from 'path';
import { DocumentPicker, MediaLibrary, ImagePicker, Constants, FileSystem, Permissions } from 'expo';
import { compose } from 'redux';
import { Alert } from 'react-native';
// @ts-ignore TODO
import { contentType } from 'react-native-mime-types';
import { ActionSheetProvider, connectActionSheet, ActionSheetProps } from '@expo/react-native-action-sheet';
import url from 'url';
import { ImageFile } from 'react-dropzone';
import { TranslateFunction } from '@restapp/i18n-client-react';
import uploadConfig from '../../../../config/upload';
import UploadView from '../components/UploadView';
import { ActionFunction } from '../actions';

interface FileOperationsProps extends ActionSheetProps {
  t: TranslateFunction;
  getFiles: ActionFunction;
  removeFile: (id: number) => ActionFunction;
  uploadFiles: (filesList: ImageFile[]) => ActionFunction;
}

interface FileOperationsState {
  downloadingFiles: { [key: string]: any };
}

const {
  manifest: { bundleUrl }
} = Constants;
const { protocol, host, hostname, port } = url.parse(__API_URL__);
const serverUrl = `${protocol}//${
  hostname === 'localhost' ? url.parse(bundleUrl).hostname + (port ? ':' + port : '') : host
}`;

const withActionSheetProvider = (Component: ComponentType) => {
  const ActionSheet = (props: any) => {
    return (
      <ActionSheetProvider>
        <Component {...props} />
      </ActionSheetProvider>
    );
  };
  return ActionSheet;
};
/*TODO*/
class FileOperations extends React.Component<FileOperationsProps, FileOperationsState> {
  constructor(props: FileOperationsProps) {
    super(props);

    this.state = {
      downloadingFiles: []
    };
  }
  // @ts-ignore TODO
  public handleRemoveFile = async (id: number) => {
    const { removeFile, getFiles } = this.props;
    await removeFile(id);
    await getFiles();
  };

  public handleUploadFile = async () => {
    const { showActionSheetWithOptions, t } = this.props;
    const options = [t('upload.media'), t('upload.documents'), t('upload.cancel')];

    showActionSheetWithOptions({ options, cancelButtonIndex: 2 }, async (buttonIndex: number) => {
      switch (buttonIndex) {
        case 0:
          if (await this.checkPermission(Permissions.CAMERA_ROLL)) {
            const { cancelled, uri }: { [key: string]: any } = await ImagePicker.launchImageLibraryAsync();
            if (!cancelled) {
              const name = uri.match(/[^\\/]*\.\w+$/)[0];

              await this.uploadFile({ uri, name });

              // Remove image from cache directory
              FileSystem.deleteAsync(uri, { idempotent: false });
            }
          }
          break;

        case 1:
          this.uploadFile(await DocumentPicker.getDocumentAsync());
          break;
        default:
          break;
      }
    });
  };

  public uploadFile = async ({ uri, name, type: pickerType }: { [key: string]: any }) => {
    const { uploadFiles, t, getFiles } = this.props;
    if (pickerType === 'cancel') {
      return;
    }

    const type = contentType(path.extname(name));
    if (type) {
      // @ts-ignore TODO
      await uploadFiles([{ uri, type, name }]);
    } else {
      Alert.alert(t('upload.errorMsg'));
    }
    await getFiles();
  };

  public handleDownloadFile = async (downloadPath: string, name: string, id: number) => {
    const { t } = this.props;
    const { downloadingFiles } = this.state;

    // @ts-ignore TODO
    this.setState({ downloadingFiles: [...downloadingFiles, id] });
    (await this.checkPermission(Permissions.CAMERA_ROLL))
      ? await this.downloadFile(downloadPath, name)
      : Alert.alert(t('download.errorMsg'));
    this.setState({ downloadingFiles: downloadingFiles.filter((fileId: number) => fileId !== id) });
  };

  public downloadFile = async (filePath: string, name: string) => {
    const { t } = this.props;
    const { albumName } = uploadConfig;
    const { getAlbumAsync, addAssetsToAlbumAsync, createAlbumAsync, createAssetAsync } = MediaLibrary;
    const { downloadAsync, deleteAsync, cacheDirectory } = FileSystem;
    try {
      const { uri } = await downloadAsync(serverUrl + '/' + filePath, cacheDirectory + name);
      const createAsset = await createAssetAsync(uri);
      // Remove file from cache directoryk
      await deleteAsync(uri);

      const album = await getAlbumAsync(albumName);
      album ? await addAssetsToAlbumAsync([createAsset], album, false) : await createAlbumAsync(albumName, createAsset);
      Alert.alert(t('download.successMsg'));
    } catch (e) {
      Alert.alert(`${e}`);
    }
  };

  public checkPermission = async (type: Permissions.PermissionType) => {
    const { getAsync, askAsync } = Permissions;
    const { status: getStatus } = await getAsync(type);
    if (getStatus !== 'granted') {
      const { status: askStatus } = await askAsync(type);
      return askStatus === 'granted';
    }
    return true;
  };

  public render() {
    return (
      // @ts-ignore TODO
      <UploadView
        {...this.props}
        handleRemoveFile={this.handleRemoveFile}
        handleUploadFile={this.handleUploadFile}
        handleDownloadFile={this.handleDownloadFile}
        downloadingFiles={this.state.downloadingFiles}
      />
    );
  }
}

// export default FileOperations;

export default compose(
  withActionSheetProvider,
  connectActionSheet
)(FileOperations);
