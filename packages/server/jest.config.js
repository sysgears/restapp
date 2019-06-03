module.exports = {
  testMatch: [
    '<rootDir>/modules/**/server-ts/**/*.test.[jt]s?(x)',
    '<rootDir>/modules/**/common-react/**/*.test.[jt]s?(x)'
  ],
  globalSetup: '<rootDir>/packages/server/src/__tests__/jestSetup.js',
  rootDir: '../..',
  resolver: './packages/server/jest.resolver',
  transform: {
    'locales[\\/]index.[jt]s': '<rootDir>/jest-transform-i18next',
    '.*': 'babel-jest'
  },
  moduleNameMapper: {
    backend_reload: 'jest-transform-stub',
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  globals: {
    __CLIENT__: false,
    __SERVER__: true,
    __DEV__: true,
    __TEST__: true,
    __SSR__: false,
    __FRONTEND_BUILD_DIR__: __dirname + '/../client/build',
    __DLL_BUILD_DIR__: __dirname + '/../../.cache/dll',
    __API_URL__: '/api'
  },
  testEnvironment: 'node'
};
