import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { isApiExternal } from '@restapp/core-common';
import ServerModule from '@restapp/module-server-ts';

import websiteMiddleware from './middleware/website';
import errorMiddleware from './middleware/error';
import contextMiddleware from './middleware/context';

const createServerApp = (modules: ServerModule) => {
  const app = express();
  // Don't rate limit heroku
  app.enable('trust proxy');

  (modules.beforeware || []).forEach(applyBeforeware => applyBeforeware(app, modules.appContext));

  (modules.middleware || []).forEach(applyMiddleware => applyMiddleware(app, modules.appContext));

  if (__DEV__) {
    app.get('/servdir', (req, res) => res.send(process.cwd() + path.sep));
  }

  if (!isApiExternal) {
    app.use(contextMiddleware(modules));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    if (modules.apiRoutes) {
      modules.apiRoutes.forEach(applyMiddleware => applyMiddleware(app, modules));
    }

    app.get('/api', (req, res) => res.json({ message: 'REST API: Success' }));
  }

  app.use(websiteMiddleware(modules));
  app.use('/', express.static(__FRONTEND_BUILD_DIR__, { maxAge: '180 days' }));

  if (__DEV__) {
    app.use('/', express.static(__DLL_BUILD_DIR__, { maxAge: '180 days' }));
    app.use(errorMiddleware);
  }
  return app;
};

export default createServerApp;
