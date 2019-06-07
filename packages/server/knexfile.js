const path = require('path');

const root = path.resolve(__dirname + '/../..');

require('@babel/register')({
  root,
  cwd: root,
  configFile: root + '/packages/server/babel.config.js',
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

require('dotenv/config');
require('@babel/polyfill');

module.exports = require('@restapp/database-server-ts/knexdata');
