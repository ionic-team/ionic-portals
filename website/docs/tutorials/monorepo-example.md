---
title: Copying Web Assets to Native Projects in a Monorepo
sidebar_label: Copying Web Assets to Native Projects in a Monorepo
---

With Ionic Portals, you need to get the built web assets for each of the portals into your native applications. There could be many ways to go about doing so, which will highly depend on your project. This quick tutorial will show how you can accomplish this when working on a monorepo project in which your web apps are in the same repository as your native apps.

## Project Structure

We will set up some NPM scripts in a moment to do the copy tasks. First, though, you need to know where to copy the assets to each native project. For Android, the web assets will go into a folder under `app/src/main/assets`, and for iOS, the folder will go directly into the folder named after your app. Below is a sample monorepo setup with three projects in the root directory (android, ios, and web), and in each native project, we will copy the web assets into a folder named `web app`. The scripts below match this structure. You will need to modify the scripts accordingly based on your project.


```
project root/
├─ android/  
├─   .gradle  
├─   app/  
  ├─  src/
    ├─ main/
      ├─ assets/    
        ├─ webapp/    
├─   build.gradle  
├─   [etc...]  
├─ ios/
├─   Pods/
├─   your native app/
      ├─ webapp/
├─   Podfile
├─   [etc...]
├─ web/
├─   build/
├─   src/
├─   package.json
├─   [etc...]
```

:::note 
For iOS, the `webapp` folder will also need to be added to the XCode project to package the web assets with the app. To do so, drag the `webapp` folder from Finder and drop it to the same folder in the Project Navigator while in XCode. 
:::

## Using NPM Scripts to Copy Assets

Now that we know where to copy the built web assets, we will use NPM scripts to run after the build step. 

Here, we will set up a `postbuild` script that will run after the `npm run build` task finishes, which will in turn call `copyto:android` and `copyto:ios`:

```json title="package.json scripts"
"postbuild": "npm run copyto:android && npm run copyto:ios",
"copyto:android": "rm -rf ../android/app/src/main/assets/webapp && cp -R build/ ../android/app/src/main/assets/webapp",
"copyto:ios": "rm -rf '../ios/portal test app/webapp' && cp -R build/ .'./ios/portal test app/webapp'"    
```

The `copyto:xxx` scripts will first remove the current folder and then copy the web assets from the build folder in the web project to the directories in which they go in the native apps.

:::note
We use the Unix command `rm` in the scripts to remove the directories, which might not work on other platforms. If you need a cross-platform solution, look into the [rimraf](https://www.npmjs.com/package/rimraf) NPM package.
:::

The dev workflow for this process is:

1. Make changes to the web app
2. Run the `npm run build` task in the web folder
3. Build the native apps
