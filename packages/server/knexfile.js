require('dotenv/config');
require('@babel/register')({ cwd: __dirname + '/../..', extensions: ['.js', '.ts'] });
require('@babel/polyfill');

module.exports = require('@restapp/database-server-ts/knexdata');
