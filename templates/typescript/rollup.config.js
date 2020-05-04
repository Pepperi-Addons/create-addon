import typescript from 'rollup-plugin-typescript2';
import pkgjson from './package.json'

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
  typescript({
      tsconfigOverride: {
          compilerOptions: {
              module: "ES2015"
          }
      }
   })
 ]
};