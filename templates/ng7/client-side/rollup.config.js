import angular from 'rollup-plugin-angular';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import virtual from 'rollup-plugin-virtual';
import sass from 'node-sass';
import CleanCSS from 'clean-css';
import { minify as minifyHtml } from 'html-minifier';

const cssmin = new CleanCSS();
const htmlminOpts = {
    caseSensitive: true,
    collapseWhitespace: true,
    removeComments: true,
};
import Utils from 'rollup-plugin-app-utils';

export default [{
   input: 'src/main.ts',
   output: {
     file: '../publish/editors/editor.plugin.bundle.js',
     format: 'umd',
     name: 'scheduler',
     globals: {
      'loadsh': '_',
    }
},
   plugins: [
      angular({
         preprocessors: {
           template: template => minifyHtml(template, htmlminOpts),
           style: scss => {
               const css = sass.renderSync({ data: scss }).css;
               return cssmin.minify(css).styles;
           },
         }
       }),
     Utils.i18nBundler({
        target: './src/assets/',
        baseLanguage: 'en',
        // Optional
        transformer: (lang, data) => {
          return data
        }
     }),
     resolve({
        jsnext: true,
        main: true,
        // pass custom options to the resolve plugin
        customResolveOptions: {
           moduleDirectory: './../../node_modules'
        }
     }),
     typescript({
      tsconfig: "tsconfig.json",
      check: false
      // typescript2: require('typescript2'),

     }),
     virtual({
      'foo': 'export default 1'
    }),
     commonjs(),
     includePaths({ paths: ["s"] }),


   ],

   external: [
     '@angular/core',
     '@angular/common',
     '@angular/cdk',
     '@angular/material',
     '@angular/http',
    //  '@ngx-translate/core',
     '@angular/forms',
     '@angular/cdk/bidi',
     '@angular/cdk/coercion',
     '@angular/cdk/observers',
     '@angular/cdk/keycodes',
     '@angular/cdk/a11y',
     '@angular/cdk/platform',
     '@angular/router',
     //'pepperi-generic-list-service',
     'pepperi-user-service',
     'pepperi-ngx-json-viewer'
      //  'pepperi-environment-variables',
   ],
   abortOnError: false
}]
