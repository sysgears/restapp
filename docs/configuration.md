# REST App Configurations

This section contains information about REST App configurations. You can follow to various sections 
by clicking the links below:

* [General Information](#general-information)
* [Basic Application Settings](#basic-application-settings)
* [Build Configuration with Zen](#build-configuration-with-zen)
* [Built-In UI Libraries](#built-in-ui-libraries)
* [Database](#database)
* [Internationalization](#internationalization)
* [Mailer](#mailer)
* [Server Side Rendering](#server-side-rendering)

## General Information

The main configuration file in REST App is called `settings.js` and it's stored in the root of the
project. This file doesn't contain any project properties but _imports_ the configuration files from the `config` 
folder. The project modules use `settings.js` to get the necessary values specified in the `config/*.js` files.

The flow looks similar to this: 

```
config/*.js => settings.js => ApplicationFile.js
```

If you wish to add specific configurations to your REST App project, we recommend creating the 
configuration file under the `config` folder. Then, you can import the settings in your concrete module as shown in the
example below:

```javascript
// entry index.ts file located in packages/server/src/modules/yourModule
import settings from '../../../../../settings';

// your code
``` 

## Basic Application Settings

You can set the basic application settings in the `config/app.js` file.

| Property            | Type    | Description                                                      |
| ------------------- | ------- | ---------------------------------------------------------------  |
| name                | String  | The project name. Defaults to 'REST App'               |
| stackFragmentFormat | String  | Special URL setting for Visual Studio Code IDE                   |
| logging             | Object  | Stores various [logging properties](#logging-properties-logging) |

You can learn more about `stackFragmentFormat` in the following documents:

* Consult [Opening Visual Studio Code with URLs] for Windows and MacOS
* Consult [Visual Studio Code URL Handler] for Linux

### Logging Properties `logging`

| Property      | Type    | Description                                                                    |
| ------------- | ------- | ------------------------------------------------------------------------------ |
| level         | String  | Sets the `logging` level to `debug` for development and `info` for production  |
| debugSQL      | Boolean | Logs the SQL commands that are executed on the back end. Defaults to `false`   |

## Build Configuration with Zen 

REST App uses [Zen], a custom JavaScript library, to configure and create builds of the web, 
server, and React Native mobile applications using the same bundler [webpack]. You can change various build 
configurations in the `.zenrc.js` files:

* `packages/client/.zenrc.js` contains the Zen settings for the client-side application
* `packages/server/.zenrc.js` contains the Zen settings for the server-side application
* `packages/mobile/.zenrc.js` contains the Zen settings for the React Native mobile app

Consult the [Zen documentation] for more information on how you can work with Zen in your REST App projects.

## Built-In UI Libraries

REST App uses [Twitter Bootstrap] to help you quickly add generic styles to the client application. 
Besides Twitter Bootstrap, the project also integrates [Ant Design]. For the React Native mobile app, you can use 
[Ant Design Mobile] or [NativeBase].

By default, REST App uses Twitter Bootstrap for the client application and NativeBase for the mobile
app. You can enable the alternatives this way: 

* To use Ant Design instead of Twitter Bootstrap, uncomment the respective import for Ant Design and comment out the 
import for Bootstrap in the ` modules/look/client-react/look.ts` file: 

```javascript
// export * from './ui-bootstrap';
export * from './ui-antd';
```

* To use Ant Design Mobile instead of NativeBase, uncomment the Ant Design Mobile export and comment out the NativeBase
export in the `modules/look/client-react-native/index.ts` file:

```javascript
// export * from './ui-native-base';
export * from './ui-antd-mobile';
```

## Database

REST App supports SQL databases (the commonest examples are PostgreSQL, MySQL, and SQLite; the 
latter is used by default in the project). The database configurations are located in the `config/db.js` file.

To be able to use PostgreSQL or MySQL, you only need to add necessary environment variables to `config/db.js` file. 
`packages/server/.env` file:

* `DB_TYPE`. Use `mysql` for MySQL or `pg` for PostgreSQL. If you don't set this property, SQLite will be used by 
default
* `DB_HOST`, you can use `localhost` for development mode.
* `DB_USER`, database username
* `DB_PASSWORD`, database password
* `DB_DATABASE`, the database to which the application will connect
* `DB_SOCKET_PATH`, the socket path 
* `DB_SSL`, use the SSL certificate to connect with SSL

**NOTE**: we advise against setting the environment variables directly in the configurations. Instead, set the variables
in the `packages/server/.env` file:

```dotenv
# Database
DB_TYPE="use mysql or pg or leave empty"
DB_HOST=
DB_SOCKET_PATH=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_SSL=
```

To set the correct values for the listed variables, consult the following documentation:

For PostgreSQL:

* [Connection URIs]
* [Secure TCP/IP Connections with SSL]
* [PostgreSQL socket path]

For MySQL:

* [Connecting using a URI String]
* [Using Encrypted Connections]
* [MySQL socket path]

## Internationalization

The internationalization configurations are stored in the `config/i18n.js` file. REST App uses the
i18next library to implement internationalization for all the platforms &ndash; client, server, and mobile.

| Property         | Type          | Description                                                              |
| ---------------- | ------------- | ------------------------------------------------------------------------ |
| enabled          | Boolean       | Enables the i18n module for all the platforms. Defaults to `true`        |
| langPickerRender | Boolean       | Enables the select component on the HTML page. Defaults to `true`        |
| langList         | Array<String> | Sets the list of supported languages. Defaults to `['en-US', 'ru-RU']`   |
| fallbackLng      | Object        | Sets the default language. Defaults to `'en-US'`                         |
| cookie           | String        | Sets the name for the cookie to store the language. Defaults to `'lang'` |

**NOTE**: the `langList` and `fallbackLng` properties are used by i18next. Consult the [i18next documentation] for more 
information. The `cookie` property is used by [i18next-express-middleware].

## Mailer

REST App uses [Nodemailer] to provide the emailing functionality. The Nodemailer configurations are 
stored in the `config/mailer.js` file.

To make the mailer module work, you need to specify these data in `packages/server/.env`:

| Property | Type   | Description                                                                      |
| -------- | ------ | -------------------------------------------------------------------------------- |
| host     | String | Sets the email host. Defaults to `smtp.ethereal.email`                           |
| port     | Number | Sets the email host port. Defaults to `587`                                      |
| auth     | Object | Sets the [user and password for authentication](#authentication-properties-auth) |

### Authentication Properties `auth`

| Property | Type   | Description                                                                 |
| -------- | ------ | --------------------------------------------------------------------------- |
| user     | String | Sets the user emails address. Defaults to `olgv7abv3lcmipb7@ethereal.email` |
| pass     | String | Sets the password for authenticating the requests                           |

**NOTE**: we advise against setting the values directly in the `config/mailer.js` file. Instead, set the Nodemailer 
properties in the `packages/server/.env` file as shown in the example below:

```dotenv
# Email
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=olgv7abv3lcmipb7@ethereal.email
EMAIL_PASSWORD=VTKxTbK7RPFNBjQwp9
```

Consult Nodemailer [general options] and [authentication] documentation for more information about the properties.

## Server Side Rendering

REST App supports Server Side Rendering (SSR), and this features is enabled by default for both 
Express server application and React client app. 

If you want to disable SSR for React and Express applications, you need to change a dedicated Zen setting in two
`.zenrc.js` files:

* For the Express application, set `config.options.ssr` to `false` in `packages/server/.zenrc.js`
* For the React application, set `config.options.ssr` to `false` in `packages/client/.zenrc.js`

**NOTE**: If you're going to disable SSR, do this in **both** `server` and `client` packages!

### Disabling SSR for Express

Disabling SSR in the Express application is done this way:

```js
// File packages/server/.spinrc.js

const config = {
  builders: {
    // ...
    stack: ['server'],
  },
  options: {
    // SSR is now disabled for server
    // Remember to also set config.options.ssr to false in package/client/.sprinrc.js
    ssr: false, // Disables SSR
    // ...
  }
};
// ...
```

### Disabling SSR for React

Concerning the React application, SSR can be disabled in two ways:

1. You can set the property `config.options.ssr` to `false` in `packages/client/.zenrc.js`.
2. You can set the environment variable `process.env.DISABLE_SSR` to `true` when running the application.

The second option gives you more flexibility, because no matter the value of `config.options.ssr`, the value of the
`process.env.DISABLE_SSR` takes precedence.
 
In `package/client/.zenrc.js`, you may notice an additional check of the value of `DISABLE_SSR`:

```js
const url = require('url');

const config = {
  builders: {
    // ...
  },
  options: {
    // ...
    ssr: true,
    // ...
  }
};

// SSR will be disabled if process.env.DISABLE_SSR is true and even if config.options.ssr is also true
if (process.env.DISABLE_SSR && process.env.DISABLE_SSR !== 'false') {
  config.options.ssr = false;
}
```

If you don't set `process.env.DISABLE_SSR`, then change the `config.options.ssr` directly.

Disabling SSR for the React application is useful when you need to run the client application alone without running the
Express application. Otherwise, if you disable building the Express application and run the React app with SSR, the 
frontend will never load (note the message `web-webpack debug still waiting for tcp:localhost:8080 after 20001ms...`):

```sh
λ yarn watch-client
yarn run v1.13.0
$ cross-env DISABLE_SSR=true lerna run --scope=client watch --stream
lerna notice cli v3.10.6
lerna info versioning independent
lerna info filter [ 'client' ]
lerna info Executing command in 1 package: "yarn run watch"
client: $ spin watch
client: spin info Version 0.4.182
client: Starting type checking service...
client: Using 1 worker with 2048MB memory limit
client: web-webpack info Webpack dev server listening on http://localhost:3000
client: web-webpack debug waiting for tcp:localhost:8080
client: web-webpack debug still waiting for tcp:localhost:8080 after 10000ms...
client: web-webpack debug still waiting for tcp:localhost:8080 after 20001ms...
```

REST App has a script `watch-client` that runs _only_ the client application, which is why SSR must 
be disabled (otherwise, the application won't be loaded). 

This is what the command looks like:

```json
{
  "scripts": {
    "watch-client": "yarn cross-env DISABLE_SSR=true lerna run --scope=client watch --stream"
  }
}
```

To enable SSR again, you need to set `config.options.ssr` to `true` in _both_ server and client packages.

[opening visual studio code with urls]: https://code.visualstudio.com/docs/editor/command-line#_opening-vs-code-with-urls
[visual studio code url handler]: https://github.com/sysgears/vscode-handler#visual-studio-code-url-handler
[webpack]: https://webpack.js.org/
[zen]: https://github.com/sysgears/larix/tree/master/packages/zen
[zen documentation]: https://github.com/sysgears/larix/blob/master/packages/zen/docs/configuration.md
[twitter bootstrap]: http://getbootstrap.com
[ant design]: https://ant.design
[ant design mobile]: https://mobile.ant.design
[nativebase]: https://nativebase.io/
[connection uris]: https://www.postgresql.org/docs/10/static/libpq-connect.html
[secure tcp/ip connections with ssl]: https://www.postgresql.org/docs/9.1/ssl-tcp.html
[postgresql socket path]: https://www.postgresql.org/message-id/21044.1326496507@sss.pgh.pa.us
[connecting using a uri string]: https://dev.mysql.com/doc/refman/8.0/en/connecting-using-path.html#connecting-using-paths-uri
[using encrypted connections]: https://dev.mysql.com/doc/refman/8.0/en/encrypted-connections.html
[mysql socket path]: https://dev.mysql.com/doc/refman/8.0/en/problems-with-mysql-sock.html
[iso language codes]: http://www.lingoes.net/en/translator/langcode.htm
[i18next documentation]: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
[i18next-express-middleware]: https://github.com/i18next/i18next-express-middleware#detector-options
[nodemailer]: https://nodemailer.com/about/
[general options]: https://nodemailer.com/smtp/#general-options
[authentication]: https://nodemailer.com/smtp/#authentication