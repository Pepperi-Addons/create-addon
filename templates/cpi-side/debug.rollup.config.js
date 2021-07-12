import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import config from '../addon.config.json';
import path from 'path'

export default config.PublishConfig.CPISide.map(endpoint => {
    return {
        input: endpoint,
        output: [
            {
                dir: '../publish',
                format: 'cjs',
                sourcemap: 'inline',
                sourcemapExcludeSources: true,
                sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
                  // will replace relative paths with absolute paths
                  return path.resolve(path.dirname(sourcemapPath), relativeSourcePath)
                },
            }
        ],
        external: [
        ],
        plugins: [
         typescript({
             tsconfigOverride: {
                 compilerOptions: {
                     module: "es2015",
                     declaration: false,
                 }
             },
             include: ['**/*.ts']
          }),
          resolve(),
          commonjs(),
          json()
        ]
       }
    }
 );