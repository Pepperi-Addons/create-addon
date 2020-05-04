import pkgjson from './package.json'
import commonjs from '@rollup/plugin-commonjs'

export default {
 input: pkgjson.main, // our source file
 output: [
  {
   file: 'dist/api.js',
   format: 'cjs'
  }
 ],
 external: [
 ],
 plugins: [
     commonjs()
 ]
};