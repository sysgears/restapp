# REST App

[![Join the chat at https://gitter.im/sysgears/restapp](https://badges.gitter.im/sysgears/apollo-fullstack-starter-kit.svg)](https://gitter.im/sysgears/restapp?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.com/sysgears/restapp.svg?branch=master)](https://travis-ci.com/sysgears/restapp)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Twitter Follow](https://img.shields.io/twitter/follow/sysgears.svg?style=social)](https://twitter.com/sysgears)

**Use [our chat] to get help or discuss general topics about REST App.**

## Description

REST App is an SEO-friendly, fully configured, modular starter project for developing [Universal
JavaScript] applications. You can use REST App to create your applications in JavaScript or TypeScript for all major
platforms &ndash; mobile, web, and server.

REST App is built with [REST], [React], [React Native], [Expo], [Knex.js], 
and [Express] with support for relational databases such as PostgreSQL, MySQL, and SQLite. 

[TypeScript] is our language of choice and we use it across the entire project. However, you can freely mix vanilla 
JavaScript (the ES6 and ES7 syntax) and TypeScript when creating your modules.

REST App also integrates [Twitter Bootstrap], [Ant Design], [Ant Design Mobile], and [NativeBase] to provide 
great possibilities for styling for your web and mobile applications.

## Table of Contents

  * [Overview](#overview)
    * [Why Use REST App](#why-use-rest-app)
    * [Concept](#concept)
    * [Architecture and Implemented Modules](#architecture-and-implemented-modules)
  * [First Run of REST App](#first-run-of-rest-app)
  * [Project Structure](#project-structure)
  * [REST App Documentation](#rest-app-documentation)
  * [Support](#support)
    * [Community Support](#community-support)
    * [Commercial Support](#commercial-support)
  * [License](#license)

## Overview

### Why Use REST App

#### I am a Developer

* Better productivity thanks to live reload and (partial) hot code reload
* A fractal modular application architecture that's easy to support and extend
* The possibility to create modules in TypeScript _and_ JavaScript at the same time
* No need to develop [typical features](#architecture-and-implemented-modules) for your applications
* Zero project configuration thanks to [Zen]

#### I am a Project Manager

* Your team will be able to reuse the code for all the platforms
* Your team can create client, server, and mobile JavaScript applications
* Your application will be easier to support and evolve thanks to the fractal modular architecture
* Your application will be based on a widely-used JavaScript ecosystem (it's easy to find JS developers)
* Your team can develop new features straightaway instead of creating the basic features

### Concept

Developing client-server-mobile projects in JavaScript never was a trivial task. Not only do you have to spend time
installing the application dependencies and configuring them, but you're also constrained to implement many basic
functionalities over and over again. And you never have time for building a starter codebase that you can reuse across
all of your projects.

To relieve you from the burden of configuring the project, building the application structure, and implementing typical
features, we created REST App.

REST App provides you with a client-server-mobile application that you can employ as a foundation
for developing new web or mobile projects using popular tools from the JavaScript ecosystem. But it doesn't
just creates a mix of top JS technologies. In fact, REST App is powered by several custom libraries and solutions to
simplify managing project configurations, creating new modules, building REST API, and perform many other tasks.

One such solution that helps to build and configure REST App without any complications is [Zen], 
a custom build tool that configures the project for all the platforms &ndash; web, server, and mobile. With Zen, we 
drastically reduced the amount of errors caused by third-party libraries for building JavaScript projects.

REST App also consists of many modules that you can augment and adapt to build your specific application, or use 
as a reference when implementing basic features for your applications even if you build them using other technologies.

### Architecture and Implemented Modules

Among all the approaches to building the application architecture, we opt for the _disposable fractal-based modular
architecture_. Thanks to this approach, it's possible to remove any built-in module from REST App 
without breaking the application. We recommend that you develop your custom modules with the same idea in mind when 
using our app.

To learn more about the features and modules available in REST App, follow to the dedicated section 
[Features and Modules].

## First Run of REST App

Verify if you use Node.js 6.x or higher (Node.js ^10 is recommended) before running the starter kit.

1. Clone the master branch of REST App.

```
git clone https://github.com/sysgears/restapp.git
cd restapp
```

**NOTE**: If you're going to use Windows to develop with REST App, you need to additionally enable 
symlinks _before_ you run the project.

For Windows 10:

* Press `Win` + `I` to open **Settings**
* Click **Update & Security**
* Click the **For Developers** tab
* In the **Use developer features** window, switch to **Developer Mode**

2. Install the dependencies. Make sure that you use Yarn 1.0.0 or higher.

```
yarn
```

You can use NPM instead of Yarn to handle the dependencies and to run scripts. Throughout the REST App documentation, we'll always use Yarn.

3. Seed sample data to the database. The command below will create new tables with sample data in SQLite:

```
yarn seed
```

SQLite is a typical default relational database installed in most Linux distributions including Mac OS X; otherwise, 
consult [SQLite installation guide].

4. Run the project in development mode:

```
yarn watch
```

The server application will be running on [http://localhost:3000], while the client application will be running on 
[http://localhost:8080]. The terminal will tell your the exact ports.

For more information about running REST App for mobile development, consult the [Getting Started] 
guide.

## Project Structure

The project structure presents generally accepted guidelines and patterns for building scalable web and mobile
applications.

The structure is _fractal_ meaning the functionality is grouped primarily by feature rather than by file type. But the
current structure isn't prescriptive, and you can change it however you like.

```
restapp
├── config                      # Various application configurations
├── docs                        # Documentation
├── node_modules                # Global Node.js modules
├── modules                     # Common project modules
├── packages                    # Application source code
│   ├── client                  # Front-end package
|   |   ├── node_modules        # Client-related Node.js modules
│   │   └── src
│   │   |   ├── _tests_         # Client-related tests
│   │   |   ├── modules         # Reexported modules for backward-compatibility purposes
│   │   |   ├── testHelpers     # Test helper for front-end integration tests
│   │   |   ├── modules.tsx     # Entry point for aggregating React front-end modules
│   │   |   └── index.tsx       # Entry point to web front end with hot code reload
|   |   ├── typings             # Types definitions for TypeScript
│   |   └── .zenrc.js           # Build configuration for the React application
│   ├── common                  # Yarn package with common code, a Redux store, and logging
│   ├── mobile                  # Mobile front-end package
|   |   ├── node_modules        # Mobile-related Node.js modules
│   │   └── src
│   │   |   ├── modules.tsx     # Entry point for aggregating React Native front-end modules
│   │   |   └── index.ts        # Entry point to mobile front end with live code reload
│   |   └── .zenrc.js           # Build configuration for React Native application
│   └── server                  # Server package
|       ├── node_modules        # Server-related Node.js modules
│       ├── src
│       │   ├── _tests_         # Server-related tests
│       |   ├── modules         # Reexported modules for backward-compatibility purposes
│       │   ├── sql             # Database connector and helpers, reexported for 
│       │   ├── testHelpers     # Test helper for back-end integration tests
│       │   ├── modules.ts      # Entry point for aggregating Node back-end modules
│       │   └── index.ts        # Entry point to back-end with hot code reload
|       ├── typings             # Types definitions for TypeScript
│       └── .zenrc.js           # Build configuration for the server
└── tools                       # All build and CLI-related files
```

## REST App Documentation

Follow to the documentation concerning different aspects of how to run, configure, and develop with REST App.

* [Getting Started]
    * [Installing and Running REST App]
    * [Running the Mobile App with Expo]
    * [Running REST App in a Mobile Simulator]
* [Running REST App with Docker]
* [Deploying REST App to Production]
* [Configuring REST App]
* [Features and Modules]
* [Writing Code]
* [Available Scripts]

Tools

* [REST App CLI]

## Support

### Community Support

* [Gitter channel] &ndash; ask questions, find answers, and participate in general discussions
* [GitHub issues] &ndash; submit issues and send feature requests
* [Wiki] &ndash; read documentation for the usage scenarios of the starter kit; edit the documentation

### Commercial Support

The [SysGears] team provides comprehensive support for commercial partners. Our team can guide you when you're using
REST App to build your application.

You can contact us via [Skype] or email [info@sysgears.com](mailto:info@sysgears.com).

## License

Copyright &copy; 2016-2019 [SysGears (Cyprus) Limited]. This source code is licensed under the [MIT] license.

[our chat]: https://gitter.im/sysgears/restapp
[mit]: LICENSE
[universal javascript]: https://medium.com/@mjackson/universal-javascript-4761051b7ae9
[jwt]: https://jwt.io
[react]: https://reactjs.org/
[angular]: https://angular.io/
[react native]: https://facebook.github.io/react-native/
[expo]: https://expo.io/
[knex.js]: http://knexjs.org
[express]: http://expressjs.com
[typescript]: https://www.typescriptlang.org/
[twitter bootstrap]: http://getbootstrap.com
[ant design]: https://ant.design
[ant design mobile]: https://mobile.ant.design
[nativebase]: https://nativebase.io
[apollokit.org]: https://apollokit.org
[zen]: https://github.com/sysgears/larix/tree/master/packages/zen
[master]: https://github.com/sysgears/apollo-universal-starter-kit/tree/master
[sqlite installation guide]: http://www.sqlitetutorial.net/download-install-sqlite/
[http://localhost:3000]: http://localhost:3000
[http://localhost:8080]: http://localhost:8080
[getting started]: https://github.com/sysgears/restapp/blob/master/docs/gettingStarted.md
[installing and running rest app]: https://github.com/sysgears/restapp/blob/master/docs/gettingStarted.md#installing-and-running-rest-app
[running the mobile app with expo]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/gettingStarted.md#running-the-mobile-app-with-expo
[running rest app in a mobile simulator]: https://github.com/sysgears/restapp/blob/master/docs/gettingStarted.md#running-rest-app-in-a-mobile-simulator
[running rest app with docker]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/docker.md
[deploying rest app to production]: https://github.com/sysgears/restapp/blob/master/docs/deployment.md
[configuring rest app]: https://github.com/sysgears/restapp/blob/master/docs/configuration.md
[features and modules]: https://github.com/sysgears/restapp/blob/master/docs/featuresAndModules.md
[writing code]: https://github.com/sysgears/restapp/blob/master/docs/writingCode.md
[rest app cli]: https://github.com/sysgears/restapp/blob/master/docs/tools/cli.md
[available scripts]: https://github.com/sysgears/restapp/blob/master/docs/yarnScripts.md
[sysgears (cyprus) limited]: http://sysgears.com
[gitter channel]: https://gitter.im/sysgears/restapp
[github issues]: https://github.com/sysgears/restapp/issues
[wiki]: https://github.com/sysgears/restapp/wiki
[faq]: https://github.com/sysgears/restapp/wiki/Frequently-Asked-Questions
[sysgears]: https://sysgears.com
[skype]: http://hatscripts.com/addskype?sysgears
