import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
 input: 'api.ts',
 output: [
  {
   file: '../publish/api.js',
   format: 'cjs'
  }
 ],
 external: [
 ],
 plugins: [
  typescript({
      tsconfigOverride: {
          compilerOptions: {
              module: "es2015",
              declaration: false
          }
      }
   }),
   resolve(),
   commonjs()
 ]
};