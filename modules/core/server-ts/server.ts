import http from 'http';
import { serverPort, log } from '@restapp/core-common';
import ServerModule from '@restapp/module-server-ts';

import createServerApp from './app';

let server: http.Server;

const ref: { modules: ServerModule; resolve: (server: http.Server) => void } = {
  modules: null,
  resolve: null
};

export const serverPromise: Promise<http.Server> = new Promise(resolve => (ref.resolve = resolve));

export const createServer = (modules: ServerModule, entryModule: NodeModule) => {
  try {
    ref.modules = modules;

    if (entryModule.hot) {
      entryModule.hot.status(event => {
        if (event === 'abort' || event === 'fail') {
          console.error('HMR error status: ' + event);
          // Signal webpack.run.js to do full-reload of the back-end
          process.exit(250);
        }
      });
      entryModule.hot.accept();
    }

    if (!server || !entryModule.hot || !entryModule.hot.data) {
      server = http.createServer();

      server.on('request', createServerApp(modules));

      server.listen(serverPort, () => {
        log.info(`API is now running on port ${serverPort}`);
        ref.resolve(server);
      });

      server.on('close', () => {
        server = undefined;
      });
    } else {
      server.removeAllListeners('request');
      server.on('request', createServerApp(ref.modules));
    }
  } catch (e) {
    log.error(e);
  }
};

if (module.hot) {
  module.hot.dispose(() => {
    // Shutdown server if changes to this module code are made
    // So that it was started afresh
    try {
      if (server) {
        server.close();
        server = undefined;
      }
    } catch (error) {
      log(error.stack);
    }
  });
}
