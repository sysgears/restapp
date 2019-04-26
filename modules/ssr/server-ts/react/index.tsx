import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import React from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import ClientModule from '@restapp/module-client-react';
import { createReduxStore } from '@restapp/core-common';
import { DocumentProps, Document } from './template';

let assetMap: { [key: string]: string };

let clientModules: ClientModule;

if (__SSR__) {
  clientModules = require('../../../../packages/client/src').default;
  if (module.hot) {
    module.hot.accept(['../../../../packages/client/src'], () => {
      clientModules = require('../../../../packages/client/src').default;
    });
  }
}

interface CreatedAppContext {
  url?: any;
  pageNotFound?: any;
}

interface CreatedApp {
  context: CreatedAppContext;
  store: any;
  App: any;
  req: Request;
  res: Response;
}

type CreateApp = (req: any, res: any) => Promise<CreatedApp>;

const createApp: CreateApp = async (req, res) => {
  const { reducers, router } = clientModules;
  const store = createReduxStore(reducers, {});
  const context: CreatedAppContext = {};

  const App = clientModules.getWrappedRoot(
    <Provider store={store}>
      {clientModules.getDataRoot(
        <StaticRouter location={req.url} context={context}>
          {router}
        </StaticRouter>
      )}
    </Provider>,
    req
  );

  return {
    context,
    store,
    App,
    req,
    res
  };
};

type RedirectOnMovedPage = (res: Response, context: CreatedAppContext) => void;

const redirectOnMovedPage: RedirectOnMovedPage = (res, context) => {
  res.writeHead(301, { Location: context.url });
  res.end();
};

const updateAssetMap = () => {
  if (__DEV__ || !assetMap) {
    const filePath = path.join(__FRONTEND_BUILD_DIR__, 'assets.json');
    assetMap = JSON.parse(fs.readFileSync(filePath).toString());
  }
};

const mapElementToStyles = (el: any, key: number) => (el ? React.cloneElement(el, { key }) : el);

type GetDocumentProps = (App: any) => DocumentProps;

const getDocumentProps: GetDocumentProps = App => {
  const sheet = new ServerStyleSheet();
  const content = renderToString(sheet.collectStyles(App));
  const css = sheet.getStyleElement().map(mapElementToStyles);
  const helmet = Helmet.renderStatic();

  return {
    clientModules,
    assetMap,
    content,
    helmet,
    css
  };
};

type RenderDocument = (documentProps: DocumentProps) => string;

const renderDocument: RenderDocument = documentProps => `
  <!doctype html>\n${renderToStaticMarkup(<Document {...documentProps} />)}
`;

type RespondWithDocument = (req: Request, res: Response, App: any) => any;

const respondWithDocument: RespondWithDocument = (req, res, App) => {
  updateAssetMap();

  if (!res.getHeader('Content-Type')) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
  }

  return res.end(req.method === 'HEAD' ? null : renderDocument(getDocumentProps(App)));
};

type SetStatus = (app: CreatedApp) => Promise<CreatedApp>;

const setStatus: SetStatus = async app => {
  app.res.status(!!app.context.pageNotFound ? 404 : 200);
  return app;
};

type RenderApp = (req: Request, res: Response) => any;

const renderApp: RenderApp = async (req, res) => {
  const { App, context } = await setStatus(await createApp(req, res));
  return context.url ? redirectOnMovedPage(res, context) : respondWithDocument(req, res, App);
};

export default renderApp;
