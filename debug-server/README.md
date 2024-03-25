# @pepperi-addons debug-server

## Installation
---
#### System Requirements for versions >= 1.x 
`node --version` > 20.0.0

For earlier node versions, please install debug-server 0.x.

## Nodejs version
The SDK is built with nodejs version 20.11.1, and is meant to run on the Lambda Node.js 20.x runtime.
You can use the following tutorial to install the correct version of nodejs on your machine:
https://asdf-vm.com/guide/getting-started.html
A .tool-versions has been added to the project to help you install the correct version of nodejs.
If you still mostly run nodejs 16.x on your machine, it is recommended to set the global version to 16.x, and use the .tool-versions file to set the correct version for the project.

``` shell
asdf global nodejs 16.17.0 
```
asdf will automatically use the .tool-versions file to set the correct version for the project.