# @pepperi-addons Typescript Template

A template for creating a pepperi addon with an angular app for the client-side & a typescript nodejs app for the server-side

* debugging server side right in vscode 
* a build script for creating all compiled files for addon
* a publish script for uploading the addon


## Installation
---
#### System Requirements
`node --version` > 12.0.0

`npm --version` > 6.0.0

#### Install by running 
``` bash
npm init @pepperi-addons
```
or 
``` bash
npx @pepperi-addons/create
```

## Project structure
---
The following is an overview of the project structure. 
The node_modules folder is in use by `npm`

#### Folders
|Folder | Description |
| :---  | :---:       |
| .vscode | vscode tasks & launch |
| client-side | an angular app that is the UI of the plugin |
| server-side | a typescripe node.js app for writing an addon API |
| publish | all files to be published to the addon are created in this folder |
| publish/api | the api endpoints created |
| publish/assets | put any assets you might need for the front end (eg. translation files, images) |

#### Additional files
`addon.config.json` contains information for publishing the addon

`var_sk` put the var API secret key here, for publishing the addon. Make sure not to commit this file. How to get the secret you ask? It's a secret!

`README.md` This file. You can file info here regarding your project.

## Debugging
---
To debug your addon in `Visual Studio Code`, press `F5` or `Run->Start Debugging`.
You can then checkout your *API* at http://localhost:4400/api/foo. Be sure to supply a JWT for it to work.

To view the addon UI, open https://app.pepperi.com/settings/your-app-uuid/editor?dev=true

If you haven't created the addon yet you can use our placeholder plugin: 
https://app.sandbox.pepperi.com/settings/a8f4698f-eb75-4a75-bdf6-1524eb9f6baf/editor?dev=true

Open the browser inspector to make sure that the editor file is served locally


## Publishing
---
When you are ready to publish your addon. Update the `addon.config.json` file, with your addons info (AddonUUID etc.). Change the `AddonVersion` to 1.0.0. The publish script will automatically bump the version patch number every time you publish the app. (eg. the next version will be 1.0.1).

To publish your addon you will need the secret-key. It is unique per addon. Put it in the var_sk file.

Then run: 
``` bash 
npm run publish-addon
```