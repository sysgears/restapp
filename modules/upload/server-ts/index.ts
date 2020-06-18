import fileUpload from 'express-fileupload';
import express, { Express } from 'express';

import ServerModule, { RestMethod } from '@restapp/module-server-ts';

import settings from '../../../settings';
import { uploadFiles, getFiles, removeFile } from './controllers';

const middleware = (app: Express) => {
  app.use('/public', express.static('public'));
  app.use(
    fileUpload({
      limits: { fileSize: settings.upload.maxSize }
    })
  );
};

export default new ServerModule({
  apiRouteParams: [
    {
      method: RestMethod.POST,
      route: 'uploadFiles',
      controller: uploadFiles
    },
    {
      method: RestMethod.GET,
      route: 'getFiles',
      controller: getFiles
    },
    {
      method: RestMethod.DELETE,
      route: 'removeFile',
      controller: removeFile
    }
  ],
  middleware: [middleware]
});
