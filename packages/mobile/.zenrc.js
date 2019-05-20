const url = require('url');

const config = {
  builders: {
    android: {
      buildDir: 'build/android',
      dllBuildDir: '../../.cache/dll',
      defines: {
        __CLIENT__: true
      },
      enabled: false
    },
    ios: {
      buildDir: 'build/ios',
      dllBuildDir: '../../.cache/dll',
      defines: {
        __CLIENT__: true
      },
      enabled: false
    }
  },
  options: {
    cache: '../../.cache',
    webpackDll: true,
    defines: {
      __DEV__: process.env.NODE_ENV !== 'production',
      __API_URL__: '"http://192.168.0.89:8080/api"',
      __WEBSITE_URL__: '"http://localhost:8080"'
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  config.builders.android.enabled = true;
  config.builders.ios.enabled = true;
  config.options.defines.__API_URL__ = '"https://restapp.herokuapp.com/api"';
  config.options.defines.__WEBSITE_URL__ = '"https://restapp.herokuapp.com"';
  // Generating source maps for production will slowdown compilation for roughly 25%
  config.options.sourceMap = false;
}

const extraDefines = {};

config.options.defines = Object.assign(config.options.defines, extraDefines);

module.exports = config;
