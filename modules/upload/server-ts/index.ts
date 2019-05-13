import fileUpload from 'express-fileupload';
import express, { Express } from 'express';

import ServerModule from '@restapp/module-server-ts';

import settings from '../../../settings';

const middleware = (app: Express) => {
  app.use('/public', express.static('public'));
  app.use(
    fileUpload({
      limits: { fileSize: settings.upload.maxSize }
    })
  );
};

export default new ServerModule({
  middleware: [middleware]
});
