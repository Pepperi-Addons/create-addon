import typescript from 'rollup-plugin-typescript2';

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
              module: "ES2015",
              declaration: false
          }
      }
   })
 ]
};