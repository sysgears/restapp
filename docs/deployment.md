# Deployment with REST App

## Deploying to Linux Running on Node.js

1. Clone the latest master branch of REST App and `cd` into the project folder:

```bash
git clone -b master https://github.com/sysgears/restapp.git
cd restapp
```

2. Install dependencies:

```bash
yarn
```

**NOTE**: REST App uses Yarn's special feature to handle the package architecture &ndash; workspaces. Using 
Yarn workspaces allows us to install all the dependencies that are listed in the root `package.json` as well as the 
dependencies in `packages/client/package.json`, `packages/server/package.json`, and `packages/mobile/package.json` from 
the root project directory. 

Managing packages architecture the same way isn't possible with NPM, which is why we're using Yarn. Otherwise, you'll 
have to install the dependencies separately from each package &ndash; client, server, and mobile &ndash; to be able to 
run the project. 

3. Seed the data to the database for production:

```bash
NODE_ENV=production yarn seed
```

4. Replace the default server port and website URL in `packages/server/.zenrc.js` to match your production setup: 

```javascript
config.options.defines.__SERVER_PORT__ = 8080; // Change to the production port
config.options.defines.__WEBSITE_URL__ = '"https://your-website-name.com"'; // Change to the production domain
``` 

5. If you need to run the mobile app, set the `__API_URL__` and `__WEBSITE_URL__` properties in 
`packages/mobile/.zenrc.js`:

```javascript
// Other configurations for the mobile app are omitted for brevity

if (process.env.NODE_ENV === 'production') {
  // Other settings are omitted for brevity
  // Change the following two lines
  config.options.defines.__API_URL__ = '"https://your-website-name.com/api"';
  config.options.defines.__WEBSITE_URL__ = '"https://your-website-name.com"';
  // Other settings are omitted for brevity
}
```

6. Compile the project for production:

```bash
yarn build
```

7. Run the project in production mode:

```bash
yarn start
```

## Deploying to Heroku

1. Create an account on [Heroku].

2. Install the Heroku Command Line Interface (CLI):
    
    - On Ubuntu, run `sudo snap install heroku --classic`
    - For Windows and MacOS, download the appropriate installer from [Heroku CLI]

3. Log in to the Heroku CLI with your Heroku login and password and follow the suggestions shown by the CLI:

```bash
heroku login
```

4. Create your application on Heroku via the CLI. Use the name of your application instead of `application-name`:

```bash
heroku create application-name
```

The command line will generate two links. The link before the pipe is the URL for your Heroku application, while the 
URL after the pipe is yhe Git repository to which you'll push your application:

```bash
https://application-name.herokuapp.com/ | https://git.heroku.com/application-name.git
```
Consult [deploying a Node.js app] for full details about creating your application on Heroku.
 
5. Set your deployment configuration variables in [Heroku Dashboard]. 

Click the name of your application in the list and then follow to the `Settings` tab. In Settings, click on the 
`Config Variables` link and add the following variable: 

| Variable        | Value |
| --------------- | ----- |
| YARN_PRODUCTION | false |

**NOTE**: If you don't need the mobile app when deploying to Heroku, open the file `packages/mobile/.zenrc.js` and set 
both `config.builders.android.enabled` and `config.builders.ios.enabled` to `false` as shown in the example below:
          
```javascript
if (process.env.NODE_ENV === 'production') {
    config.builders.android.enabled = false;
    config.builders.ios.enabled = false;
    // Other code is omitted for brevity
}
```
 
However, if you want to deploy a mobile app, first create an account on [Expo]. Additionally, you need to set these 
three variables in Heroku Dashboard:

| Variable        | Value                      |
| --------------- | -------------------------- |
| YARN_PRODUCTION | false                      |
| EXP_USERNAME    | your_expo_account_username | 
| EXP_PASSWORD    | your_expo_account_password |
    
**NOTE**: To register new users, configure your SMTP server. By default, REST App uses [Ethereal] 
for the fake SMTP server, but you shouldn't use Ethereal for production application because the registration emails with 
the validation link will be sent to Ethereal, _not_ to the real users.

| Variable       | Value                      |
| -------------- | -------------------------- |
| EMAIL_HOST     | mailboxExample.example.com | 
| EMAIL_PASSWORD | examplePassword            |
| EMAIL_USER     | example@example.com        | 

6. Set a proper value for the server website URL in `packages/server/.zenrc.js` to match your production setup.
 
* If you're deploying your application on Heroku without a custom domain name, the production URL will look similar to 
this:

```javascript
config.options.defines.__WEBSITE_URL__ = '"https://application-name.herokuapp.com"';
```

`application-name` is the name of your application you've generated at the step 4 (creation of an app with the Heroku 
CLI).

* If you're using a custom domain, the production URL will look like this:

```javascript
config.options.defines.__WEBSITE_URL__ = '"http://domain-example.com"';
```

Remember to add the custom domain in [Heroku Dashboard]. Select your application from the list, and then follow to the 
`Settings` tab. Scroll to the button **Add domain** and add your domain.  

7. If you're deploying your mobile app to Expo, you need to connect the app to the back-end URL. To do that, edit the 
`packages/mobile/.zenrc.js` file:

* If you're deploying your app on Heroku without a custom domain name, the production URLs will look like this:

```javascript
config.options.defines.__API_URL__ = '"https://application-name.herokuapp.com/api"';
config.options.defines.__WEBSITE_URL__ = '"https://application-name.herokuapp.com"';
```

* If you're using a custom domain, the production URLs will look like this:

```javascript
config.options.defines.__API_URL__ = '"http://domain-example.com/api"';
config.options.defines.__WEBSITE_URL__ = '"http://domain-example.com"';
```

8. Configure other REST App modules if necessary.

9. Commit your changes and run the command below with the name of your application instead of `application-name`:
 
```bash
git push https://git.heroku.com/application-name.git
```

If you're deploying from another branch (not from master) run:
 
```bash
git push --force heroku your_branch:master
```

10. Heroku will automatically build your project. The website will be published to Heroku, and the mobile app will be 
available on [Expo.io].

## Publishing a Mobile App

1. Compile your project for production:

```bash
yarn build
```

2. Run the following command to publish your mobile app:

```bash
yarn exp publish
```

## Building a Standalone Mobile App for Google Play or App Store

1. Compile your project for production:

```bash
yarn build
```
 
2. Run the command below to build a signed `.apk` for Android:

```bash
yarn exp ba
```

You need to run the command below to build a signed `.iap` for iOS:

```bash
yarn exp bi
```

3. Run `yarn exp bs` to get the status and links for signed standalone mobile apps when the build finishes. 

For more details refer to Building Standalone Apps in [the Expo documentation], but use `yarn exp ..` instead of 
`exp ...` command.

[heroku]: https://heroku.com
[heroku cli]: https://devcenter.heroku.com/articles/heroku-cli#download-and-install
[deploying a node.js app]: https://devcenter.heroku.com/articles/getting-started-with-nodejs
[heroku dashboard]: https://dashboard.heroku.com/apps
[expo]: https://expo.io
[ethereal]: https://ethereal.email/
[the stripe module]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/modules/stripeSubscription.md
[expo.io]: https://expo.io
[the expo documentation]: https://docs.expo.io/versions/latest/