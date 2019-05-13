import fileUpload from 'express-fileupload';
import express, { Express } from 'express';
import ServerModule from '@restapp/module-server-ts';

const middleware = (app: Express) => {
  app.use('/public', express.static('public'));
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 }
    })
  );
};

export default new ServerModule({
  middleware: [middleware]
});
