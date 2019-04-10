export default {
  name: 'REST App',
  logging: {
    level: ['production'].indexOf(process.env.NODE_ENV) < 0 ? 'debug' : 'info',
    debugSQL: false
  },
  // Check here for Windows and Mac OS X: https://code.visualstudio.com/docs/editor/command-line#_opening-vs-code-with-urls
  // Use this protocol handler for Linux: https://github.com/sysgears/vscode-handler
  stackFragmentFormat: 'vscode://file/{0}:{1}:{2}'
};
