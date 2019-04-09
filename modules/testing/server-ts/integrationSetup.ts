import chai from 'chai';
import { Server } from 'http';
import chaiHttp from 'chai-http';
import WebSocket from 'ws';

import { serverPromise } from '@restapp/core-server-ts';
import { populateTestDb } from '@restapp/database-server-ts';

chai.use(chaiHttp);
chai.should();

let server: Server;

before(async () => {
  if (!global._babelPolyfill) {
    // tslint:disable-next-line
    require('@babel/register')({ cwd: __dirname + '/../../..', extensions: ['.js', '.ts'], ignore: [ /build\/main.js/ ] });
    require('@babel/polyfill');
  }
  await populateTestDb();

  server = await serverPromise;

  global.WebSocket = WebSocket;
});

after(() => {
  if (server) {
    server.close();
    delete global.__TEST_SESSION__;
  }
});

export const getServer = () => server;
