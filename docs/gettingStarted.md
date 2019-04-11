# Getting Started with REST App

In this section, you'll install REST App and run the project for web or mobile development.

Follow the links below to the installation sections you're interested in:

1. [Installing and Running REST App](#installing-and-running-rest-app)
2. [Running the Mobile App with Expo](#running-the-mobile-app-with-expo)
3. [Running REST App in a Mobile Simulator](#running-rest-app-in-a-mobile-simulator)
    * [Android Studio](#android-studio)
    * [Genymotion](#genymotion)
    * [Xcode](#xcode)

## Installing and Running REST App

1. Install Node.js 6.x or higher. Using Node.js 8.x is recommended.

2. Clone the master branch of REST App.

```bash
git clone -b master https://github.com/sysgears/restapp.git
cd restapp
```

1. Install the dependencies:

```bash
yarn
```

**NOTE**: REST App uses Yarn's special feature called _workspaces_ along with [Lerna] to handle the package
architecture. Using Yarn workspaces and Lerna allows us to build libraries and applications in a single repository.
This is why, though REST App comes with four `package.json` files with different dependencies, you can install
all the dependencies with `yarn` from the root directory.

Managing packages architecture this way isn't possible with NPM, which is why we recommend Yarn. Otherwise, you'll have
to install the dependencies separately for each package &ndash; client, server, and mobile &ndash; to be able to run the
project.

4. Seed sample data to the database. The command below will create new tables with sample data in SQLite:

```bash
yarn seed
```

5. Run the project in development mode:

```bash
yarn watch
```

After running `yarn watch`, your default browser will automatically open the web application at [http://localhost:3000/]. 
You can start changing the application code, and the changes will be applied immediately thanks to the live reload. You 
can also open the app in multiple tabs and test it.

## Running the Mobile App with Expo

1. Install the Expo Client app on [your Android] or [iOS device].

2. Activate building the mobile app code for Android or iOS (or both) in the application properties in the
`packages/mobile/.zenrc.js` configuration file:

    * Set `builders.android.enabled` to `true` to build the mobile app for an Android
    * Set `builders.ios.enabled` to `true` to run the mobile app for iOS

Example:
```javascript
const url = require('url');

const config = {
  builders: {
    android: {
      //...other configurations are omitted
      enabled: false // Set to true to run the app on Android
    },
    ios: {
      //...other configurations are omitted
      enabled: false // Set to true to run the app on iOS
    },
  },
}
  //...other configurations are omitted.
```

3. Create data in the database (if you've already run REST App before, skip this step):

```bash
yarn seed
```

4. Launch the project with `yarn watch`.

**NOTE**: If you need to launch the project only for specific platform (Android or iOS) you can use separate scripts: `yarn watch:android` or `yarn watch:ios`.

**NOTE**: It may take up to a minute or more to build the mobile version of the app. The next runs will be much faster.

5. Scan the QR codes using Expo Client on your Android or using Camera app on iOS device.

If scanning the codes doesn't launch the mobile app, you can manually enter the link to the app:

1. Tap **Explore** in Expo Client.
2. Enter the link similar to this: `exp://000.000.000:19000`. Use your real IP address instead of 000.000.000.

You can look for the link for Expo Client in the console: REST APp kindly provides the links you can use to
open the app on your device.

## Running REST App in a Mobile Simulator

### Android Studio

1. Install and launch [Android Studio].
2. On the **Tools** menu, click **AVD Manager** and [configure your virtual smartphone].
3. Choose a device from the list in **Select Hardware**. Click **Next**.
4. Choose a system image from the list. You can open the **x86 Images** tab and install the suitable image.

**NOTE**: we recommend installing the Lollipop x86_64 API image. With this low-level API, the emulator will work more
rapidly than with other APIs.

5. Open the `~/.bashrc` file in your favorite text editor and add the following line:

```bash
export PATH="/home/username/Android/Sdk/platform-tools:$PATH"
```

This line will add the `~/Android/Sdk/platform-tools/` directory into `PATH` and allow Expo (inside the project) to
use the `adb` instance from the Android SDK. Put simply, the Expo client will be automatically installed and run in the
simulator when you run the REST App project for mobile.

**NOTE**: use the username on you development computer instead of the `/username/` part in `PATH`, for example,
`"/home/johndoe/Android/Sdk/platform-tools:$PATH"`.

6. Activate building the mobile app code for Android or iOS (or both) in the application properties in the
`packages/mobile/.zenrc.js` configuration file:

    * Set `builders.android.enabled` to `true` to build the mobile app for an Android
    * Set `builders.ios.enabled` to `true` to run the mobile app for iOS

Example:
```javascript
const url = require('url');

const config = {
  builders: {
    android: {
      //...other configurations are omitted
      enabled: false // Set to true to run the app on Android
    },
    ios: {
      //...other configurations are omitted
      enabled: false // Set to true to run the app on iOS
    },
  },
}
  //...other configurations are omitted.
```

7. Launch your virtual phone from AVD Manager: open the **Tools** menu and click **AVD Manager**. In the list of
available virtual devices, run the one you created.

8. Launch the project with `yarn watch`.

**NOTE**: If you need to launch the project only for specific platform (Android or iOS) you can use separate scripts: `yarn watch:android` or `yarn watch:ios`.

**NOTE**: If you're launching REST App for the first time, you may need to first run `yarn seed` to generate
sample data. After that, you can start the app with `yarn watch`.

9. The Expo Client app will automatically start. You don't need to additionally install Expo Client on the virtual
smartphone.

**NOTE**: It may take up to a minute or two to build and run the mobile app on Android for the first time. The next runs
will be more rapid.

### Genymotion

1. Downloading and install [Genymotion].

2. Install [VirtualBox].

3. Create a new emulator and start it.

4. After starting the server, Expo Client will start on it's own.

5. To bring up the developer menu, press ⌘ + M on your keyboard.

If you are using Genymotion, on the **Settings** menu select **ADB**. Then select **Use custom Android SDK tools**, and
add the path to your Android SDK directory.

### Xcode

1. Install [Xcode].

2. Install the Command Line Tools for Xcode:

```bash
xcode-select --install
```

3. Launch Xcode, on the **Preferences** menu, click **Components**.

4. Install a necessary simulator from the list.

5. Run the project with `yarn watch` or `yarn watch:ios`.

Simulator will start automatically and open the app in Expo. To bring up the developer menu, press ⌘ + D on your
keyboard.

**NOTE**: If the iOS simulator fails to start Expo Client or the mobile app, try resetting the simulator:

* On the **Hardware** menu, click **Erase all content and settings**.
* Restart the application.

[lerna]: https://lernajs.io/
[http://localhost:3000/]: http://localhost:3000/
[your android]: https://play.google.com/store/apps/details?id=host.exp.exponent
[ios device]: https://itunes.apple.com/app/expo-client/id982107779?mt=8
[android studio]: https://developer.android.com/studio/
[configure your virtual smartphone]: https://developer.android.com/studio/run/managing-avds
[genymotion]: https://www.genymotion.com
[virtualbox]: https://www.virtualbox.org/wiki/Downloads
[xcode]: https://developer.apple.com/xcode/
