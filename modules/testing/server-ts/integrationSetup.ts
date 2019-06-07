import chai from 'chai';
import { Server } from 'http';
import chaiHttp from 'chai-http';

import { serverPromise } from '@restapp/core-server-ts';
import { populateTestDb, knex } from '@restapp/database-server-ts';

chai.use(chaiHttp);
chai.should();

let server: Server;

export const setup = async () => {
  if (!global._babelPolyfill) {
    // tslint:disable-next-line
    require('@babel/polyfill');
  }
  await populateTestDb();

  server = await serverPromise;
};

export const cleanup = () => {
  knex.destroy();
  if (server) {
    server.close();
    delete global.__TEST_SESSION__;
  }
};

export const getServer = () => server;
