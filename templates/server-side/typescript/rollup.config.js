import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import config from '../addon.config.json'

export default config.Endpoints.map(endpoint => {
    return {
        input: endpoint,
        output: [
         {
          dir: '../publish/api',
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
       }
    }
 );