import { TranslateFunction } from '@restapp/i18n-client-react';
import { DropFilesEventHandler, ImageFile } from 'react-dropzone';
import { ActionSheetProps } from '@expo/react-native-action-sheet';
import { ActionFunction } from '../actions';

export interface File {
  id?: number;
  preview: string;
  type: string;
  name: string;
}

interface UploadCommonProps {
  t: TranslateFunction;
  files?: ImageFile[];
  error?: { [key: string]: any };
  loading?: boolean;
}

interface UploadNativeCommonProps {
  t: TranslateFunction;
  files?: File[];
  error?: { [key: string]: any };
  loading?: boolean;
}

export interface UploadProps extends UploadCommonProps {
  getFiles: ActionFunction;
  removeFile: (id: number) => ActionFunction;
  uploadFiles: (filesList: ImageFile[]) => ActionFunction;
}

export interface FileOperationsProps extends ActionSheetProps {
  t: TranslateFunction;
  getFiles: ActionFunction;
  removeFile: (id: number) => ActionFunction;
  uploadFiles: (filesList: File[]) => ActionFunction;
}

export interface FileNativeOperationsState {
  downloadingFiles: number[];
}

export interface UploadViewProps extends UploadCommonProps {
  onUploadFiles: DropFilesEventHandler;
  handleRemoveFile: (id: number) => Promise<void>;
}

export interface UploadNativeViewProps extends UploadNativeCommonProps {
  handleUploadNativeFiles: () => Promise<void>;
  handleRemoveFile: (id: number) => Promise<void>;
  downloadingFiles: number[];
  handleDownloadFile: (path: string, name: string, id: number) => Promise<void>;
}
