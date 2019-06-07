const url = require('url');

const config = {
  builders: {
    web: {
      dllExcludes: ['bootstrap'],
      dllBuildDir: '../../.cache/dll',
      defines: {
        __CLIENT__: true
      },
      // Wait for backend to start prior to letting webpack load frontend page
      waitOn: [`tcp:${process.env.SERVER_HOST || 'localhost:8080'}`],
      enabled: true
    }
  },
  options: {
    cache: '../../.cache',
    ssr: true,
    webpackDll: true,
    defines: {
      __DEV__: process.env.NODE_ENV !== 'production',
      __API_URL__: '"/api"'
    },
    webpackConfig: {
      devServer: {
        disableHostCheck: true
      }
    }
  }
};

if (process.env.DISABLE_SSR && process.env.DISABLE_SSR !== 'false') {
  config.options.ssr = false;
}

config.options.devProxy = config.options.ssr;

if (process.env.NODE_ENV === 'production') {
  // Generating source maps for production will slowdown compilation for roughly 25%
  config.options.sourceMap = false;
}

const extraDefines = {
  __SSR__: config.options.ssr
};

config.options.defines = Object.assign(config.options.defines, extraDefines);

module.exports = config;
