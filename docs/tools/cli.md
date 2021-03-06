# REST App CLI

We encourage you to modularize your REST App-based applications. It's best to design each
application module as a decoupled chunk of functionality to make sure that deleting this module won't affect the other 
parts of the application.

To help you create and delete new application modules, REST APp comes with a custom Command Line Interface (CLI).

You can view the help guide on using the CLI with by running:

```bash
yarn cli
```

In the command line, you'll see how to use the CLI, the available commands, and the optional parameters, which you can
pass to the commands:

```bash
yarn cli

$ node tools/cli

   cli 1.0.0 - Full info: https://github.com/sysgears/restapp/blob/master/docs/tools/cli.md

   USAGE

     cli <command> [options]

   COMMANDS

     addmodule <moduleName> [location]                  Create a new Module.
     deletemodule <moduleName> [location]               Delete a Module
     help <command>                                     Display help for a specific command

   GLOBAL OPTIONS

     -h, --help         Display help                                      
     -V, --version      Display version                                   
     --no-color         Disable colors                                    
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages    

Done in 0.94s.
```

## Basic Scaffolding with `addmodule`

You can generate a feature module using the following command:

```bash
yarn cli addmodule Order
```

The `addmodule` command will create all the files for a new application module `Order` for both the client and the
server applications.

You can consider a module generated with `addmodule` as an empty template without any functionality.

You'll see the following output after the generation of the module is completed:

```bash
# The output
yarn run v1.9.4
$ node tools/cli addmodule Order
Copying client files…
✔ The client files have been copied!
✔ Module for client successfully created!
Copying server files…
✔ The server files have been copied!
✔ Module for server successfully created!
Done in 11.15s.
```

The CLI will generate the following files for the server under the directory `modules/Order/server-ts`:

```
modules/Order/server-ts/
├── index.ts                       # a basic file with imported sql and ServerModule
└── sql.ts                         # a Knex connector
```

The CLI will generate the following files for the client under the directory `modules/Order/client-react`:

```
modules/Order/client-react
├── __tests__
    └── Order.spec.ts                    # a simple test
├── components                           # basic components for the React Native app and for web app
    ├── OrderView.native.tsx             # a basic React Native View component
    └── OrderView.tsx                    # a basic web application View component
├── containers                           # stores containers for the Order
    └── Order.tsx                        # a basic container for OrderView component
├── locales                              # default localizations
    ├── en                               # English localization
        └── translations.json            # JSON with English translations
    └── ru                               # Russian localization
        └── translations.json            # JSON with Russian translations
    └── index.js                         # a utility JavaScript file
├── index.native.tsx                     # a default React Native app file
└── index.tsx                            # a default web application file
```

The generated module is imported into the `packages/client/src/modules.ts` and `packages/server/src/modules.ts` files. Also, new module will be added as a dependency into `packages/client/package.json` and `packages/server/package.json`

## Deleting Features with `deletemodule`

If you need to delete an existing module, run:

```bash
yarn cli deletemodule <moduleName>
```

You'll see the following confirmation in the command line:

```bash
yarn run v1.9.4
$ node tools/cli deletemodule Order
Deleting client files…
✔ Module for client successfully deleted!
Deleting server files…
✔ Module for server successfully deleted!
Done in 3.89s.
```

You can use this command to delete any standard module that REST App comes with.

## Running CLI with Options (Flags)

To see the CLI help, run one of the following commands:

```bash
yarn cli
yarn cli -h
yarn cli --help
```

To view the current CLI version, run `yarn cli` with capitalized `-V` or `--version` parameter:

```bash
yarn cli -V
yarn cli --version
```

The output generated by the CLI is colored by default. You can turn off the colors by running the CLI with `--no-color`:

```bash
yarn cli --no-color
```

To hide warnings and error messages when you're using the CLI, run the CLI with the `--quiet` option:

```bash
yarn cli --quiet
```

To view the debug messages when using the CLI, run `cli` with the lowercase `-v` or `--verbose` option:

```bash
yarn cli -v
yarn cli --verbose
```
