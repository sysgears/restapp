import express, { Express } from 'express';
import path from 'path';

import { isApiExternal } from '@restapp/core-common';
import ServerModule, { MiddlewareFunc } from '@restapp/module-server-ts';

import errorMiddleware from './middleware/error';

type ApplyMiddleware = (middleware: MiddlewareFunc) => void;

export const createServerApp = (modules: ServerModule) => {
  const app: Express = express();
  // Don't rate limit heroku

  app.enable('trust proxy');

  const { appContext, beforeware, middleware, ssrMiddleware } = modules;

  const applyMiddleware: ApplyMiddleware = middlewareFunc => middlewareFunc(app, appContext);

  // apply high-priority middlewares
  if (beforeware) {
    beforeware.forEach(applyMiddleware);
  }

  // apply normal-priority middlewares
  if (middleware) {
    middleware.forEach(applyMiddleware);
  }

  if (__DEV__) {
    app.get('/servdir', (req, res) => res.send(process.cwd() + path.sep));
  }

  // apply REST API controllers
  if (!isApiExternal) {
    app.get('/api', (req, res) => res.json({ message: 'REST API: Success' }));
  }

  // apply SSR middleware
  if (ssrMiddleware) {
    ssrMiddleware.forEach(applyMiddleware);
  }

  app.use('/', express.static(__FRONTEND_BUILD_DIR__, { maxAge: '180 days' }));

  if (__DEV__) {
    app.use('/', express.static(__DLL_BUILD_DIR__, { maxAge: '180 days' }));
    app.use(errorMiddleware);
  }
  return app;
};
