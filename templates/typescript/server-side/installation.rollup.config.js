import typescript from 'rollup-plugin-typescript2';
import pkgjson from './package.json'

export default {
 input: 'installation.ts', // our source file
 output: [
  {
   file: '../publish/installation.js',
   format: 'cjs'
  }
 ],
 external: [
 ],
 plugins: [
  typescript({
      tsconfigOverride: {
          compilerOptions: {
              module: "ES2015",
              declaration: false
          }
      }
   })
 ]
};