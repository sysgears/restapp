# REST App Features

In this section, you can find information about the features and implemented modules available in REST App.

## Internationalization with i18next

REST App integrates the [i18next] library to help localize the application using a complete 
internationalization solution for the web and server applications. The project provides the functionality to 
automatically detect and remember the language, as well as remember the language selected by the user.

## Server Side Rendering with Apollo Redux Store

REST App has a mechanism to handle Server Side Rendering (SSR). Once the client application requests a 
web page, the back end fully renders the user interface. 
Then, the front end updates itself when the user interacts with it. 

You may consult the [REST App configurations] to know how to enable and disable SSR.

## Support for SQL and Arbitrary Data Sources

The [Knex] code for accessing SQLite is included as an example of using arbitrary data source. You can use any NoSQL storage or other data source in a similar way.

[Debug SQL] prints out excluded queries, with respective times in development mode. To set up debugging SQL, consult 
[REST App configurations].

## Styling Libraries

REST App provides great styling possibilities by integrating a few generic style libraries. 

The demo web application uses the Sass version of [Twitter Bootstrap]. To help you style the React components, the 
project was integrated with [Styled Components]. The React Native mobile application uses [NativeBase].
    
Additionally, you can use [Ant Design] instead of Twitter Bootstrap for the web application, and [Ant Design Mobile] 
instead of NativeBase for the mobile app.

## Google Analytics

We integrated Google Analytics into REST App with the help of [React Google Analytics].

## Webpack for Back End

REST App stands out compared to similar starter projects in that it uses [webpack] not only for building the code 
for the client application, but for the server application as well. Using webpack for the server application adds 
powerful features such as conditional compilation, embedding non-JavaScript and CSS files into the code, hot code 
reloading, and other convenient functionalities.

## Webpack and Expo for Mobile Front End

To ensure that the code can be shared among all the REST App packages &ndash; client, server, and mobile 
&ndash; we set up webpack to build the bundles for React Native mobile app with the help of [Haul CLI]. Haul CLI and 
webpack are coordinated with [Zen] to replace [Metro], a Facebook custom bundler for React Native apps.

The created React Native bundles use [Expo], which allows you avoid using additional tools for compiling the native 
code. Consequently, it's simpler to develop native mobile applications with REST App.

## Generation of Webpack DLL Vendor Bundles

We set up REST App to ensure that _webpack vendor DLL bundle_ is generated and updated automatically for all the 
non-development dependencies. We ensured that webpack processes vendor libraries only when they were actually changed, 
not on every change. This approach boosts the speed for cold project start in development mode and for hot code 
reloading even if the number of dependencies is very large.

## Hot Code Reload and Live Code Reload

Automatic code reloading for the server is done using webpack. When webpack prepares hot patches on the filesystem, the 
SIGUSR2 signal is sent to the Node.js application, and embedded webpack Hot Module Runtime reacts to this signal and 
applies patches to running modules from the filesystem.
  
The hot code reload for the front end is implemented with [webpack-dev-server] and the [Hot Module Replacement] plugin. 
Hot patches for React components are applied on the front end and back end at the same time, so React won't complain 
about the differences between the client and server code.

## Babel 
  
REST App uses a popular transpiler [Babel] for transpiling the ES7 and ES6 code to ES5.

## ESLint and TSLint

[ESLint] and [TSLint] will help you stick with the proper code style. REST App automatically checks 
any changes in JavaScript files with ESLint and the changes in TypeScript files with TSLint before they're committed to 
Git.

## React & React Native

REST App is set up for [React] and [React Native] for the client and mobile applications 
respectively. When building React and React Native components, you can use both `.jsx` and `.tsx` extensions as the 
project supports the [JSX] and [TSX] syntax.

## React Helmet

[React Helmet] is a small library for React applications that's used for creating a declarative and dynamic HEAD 
section for HTML pages. Put simply, using React Helmet in the project, we create the `<head></head>` with metadata, 
styles, and title for the React application.

## React Hot Loader 

REST App supports [React Hot Loader], although we turned off this library by default. The project uses only 
the Hot Module Reloading webpack plugin for hot reloading of your code. We believe that the HMR plugin for webpack 
covers all practical needs during development.

Using React Hot Loader in conjunction with webpack HMR makes hot reloading less predictable, which leads to various 
errors. Consult the [Configuring REST App] section if you still want to use React Hot Loader.

## TypeScript
  
Most project code is written in [TypeScript] to ensure type safety, but you can freely mix JavaScript for developing 
your modules when TypeScript starts restricting your possibilities.

Just as JavaScript, TypeScript is also compiled to ES5 code.

[i18next]: https://www.i18next.com
[knex]: http://knexjs.org
[debug sql]: https://spin.atomicobject.com/2017/03/27/timing-queries-knexjs-nodejs/
[rest app configurations]: https://github.com/sysgears/restapp/blob/master/docs/configuration.md
[twitter bootstrap]: http://getbootstrap.com
[styled components]: https://www.styled-components.com/
[nativebase]: https://nativebase.io
[ant design]: https://ant.design
[ant design mobile]: https://mobile.ant.design
[react google analytics]: https://github.com/react-ga/react-ga
[webpack]: https://webpack.js.org/
[haul cli]: https://github.com/callstack-io/haul
[zen]: https://github.com/sysgears/larix/tree/master/packages/zen
[metro]: https://facebook.github.io/metro/
[expo]: https://expo.io
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server/
[hot module replacement]: https://webpack.js.org/plugins/hot-module-replacement-plugin/
[babel]: https://babeljs.io/
[eslint]: https://eslint.org/
[tslint]: https://palantir.github.io/tslint/
[react]: https://reactjs.org/
[react native]: https://facebook.github.io/react-native/
[jsx]: https://reactjs.org/docs/jsx-in-depth.html
[tsx]: https://www.typescriptlang.org/docs/handbook/jsx.html
[react helmet]: https://www.npmjs.com/package/react-helmet
[react hot loader]: https://github.com/gaearon/react-hot-loader
[typescript]: https://www.typescriptlang.org/
