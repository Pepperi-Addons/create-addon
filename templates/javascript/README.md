This is a skeleton project for creating javascript addon api's
it provides two major things:
1. use many files in JS or typescript and then using rollup to create one javascript file in pepperi addon api standard 
2. debug and run this api on your localhost (e.g. http://localhost:3002/api/foo on postman)

First thing first run
```npm install```
to install dependencies

To debug locally click Run -> Debug.

To export a js file to upload to your addon run:
```npm run build```
The output file should be in dist/api.js.

To add your code check my service files (typescript or javascript)