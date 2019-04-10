import React, { ReactElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import fs from 'fs';
import path from 'path';
import Helmet, { HelmetData } from 'react-helmet';
import ServerModule from '@restapp/module-server-ts';
import ClientModule from '@restapp/module-client-react';
import { createReduxStore } from '@restapp/core-common';
import { styles } from '@restapp/look-client-react';

let assetMap: { [key: string]: string };

interface HtmlProps {
  content: string;
  state: any;
  css: Array<ReactElement<{}>>;
  helmet: HelmetData;
}

let clientModules: ClientModule;
if (__SSR__) {
  clientModules = require('../../../../packages/client/src').default;
  if (module.hot) {
    module.hot.accept(['../../../../packages/client/src'], () => {
      clientModules = require('../../../../packages/client/src').default;
    });
  }
}

const Html = ({ content, state, css, helmet }: HtmlProps) => (
  <html lang="en" {...helmet.htmlAttributes.toComponent()}>
    <head>
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <link rel="apple-touch-icon" sizes="180x180" href={`${assetMap['apple-touch-icon.png']}`} />
      <link rel="icon" type="image/png" href={`${assetMap['favicon-32x32.png']}`} sizes="32x32" />
      <link rel="icon" type="image/png" href={`${assetMap['favicon-16x16.png']}`} sizes="16x16" />
      <link rel="manifest" href={`${assetMap['manifest.xjson']}`} />
      <link rel="mask-icon" href={`${assetMap['safari-pinned-tab.svg']}`} color="#5bbad5" />
      <link rel="shortcut icon" href={`${assetMap['favicon.ico']}`} />
      <meta name="msapplication-config" content={`${assetMap['browserconfig.xml']}`} />
      <meta name="theme-color" content="#ffffff" />
      {!__DEV__ && <link rel="stylesheet" type="text/css" href={`${assetMap['index.css']}`} />}
      {!!__DEV__ && (
        <style
          dangerouslySetInnerHTML={{
            __html: styles._getCss() + clientModules.stylesInserts.map((style: any) => style._getCss()).join('')
          }}
        />
      )}
      {!!css && css}
      {clientModules.scriptsInserts.map((script: string, i: number) => {
        if (script) {
          return <script key={i} src={script} />;
        }
      })}
    </head>
    <body {...helmet.bodyAttributes.toComponent()}>
      <div id="root" dangerouslySetInnerHTML={{ __html: content || '' }} />
      {assetMap['vendor.js'] && <script src={`${assetMap['vendor.js']}`} charSet="utf-8" />}
      <script src={`${assetMap['index.js']}`} charSet="utf-8" />
    </body>
  </html>
);

const renderServerSide = async (req: any, res: any, modules: ServerModule) => {
  const store = createReduxStore(clientModules.reducers, {});
  const context: any = {};
  const App = clientModules.getWrappedRoot(
    <Provider store={store}>
      {clientModules.getDataRoot(
        <StaticRouter location={req.url} context={context}>
          {clientModules.router}
        </StaticRouter>
      )}
    </Provider>,
    req
  );

  context.pageNotFound === true ? res.status(404) : res.status(200);

  if (context.url) {
    res.writeHead(301, { Location: context.url });
    res.end();
  } else {
    if (__DEV__ || !assetMap) {
      assetMap = JSON.parse(fs.readFileSync(path.join(__FRONTEND_BUILD_DIR__, 'assets.json')).toString());
    }

    const sheet = new ServerStyleSheet();
    const htmlProps: HtmlProps = {
      content: ReactDOMServer.renderToString(sheet.collectStyles(App)),
      css: sheet.getStyleElement().map((el, idx) => (el ? React.cloneElement(el, { key: idx }) : el)),
      helmet: Helmet.renderStatic(), // Avoid memory leak while tracking mounted instances
      state: {}
    };

    res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(<Html {...htmlProps} />)}`);
    res.end();
  }
};

export default (modules: ServerModule) => async (req: any, res: any, next: (e?: Error) => void) => {
  try {
    if (req.path.indexOf('.') < 0 && __SSR__) {
      return await renderServerSide(req, res, modules);
    } else if (req.path.indexOf('.') < 0 && !__SSR__ && req.method === 'GET') {
      res.sendFile(path.resolve(__FRONTEND_BUILD_DIR__, 'index.html'));
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};
