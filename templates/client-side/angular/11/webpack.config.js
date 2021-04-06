const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const singleSpaAngularWebpack = require('single-spa-angular-webpack5/lib/webpack').default;
const { merge } = require('webpack-merge');
// const deps = require('./package.json').dependencies;
const webpack = require('webpack');

module.exports = (angularWebpackConfig, options, env) => {

  angularWebpackConfig.plugins.push(
        new webpack.DefinePlugin({
          CLIENT_MODE: JSON.stringify(env.configuration),
        })
    )

    if (env.configuration === 'Standalone') {
        return angularWebpackConfig;
    }
    else {

        const mfConfig = {
        output: {
          uniqueName: "addon"
        },
        optimization: {
          // Only needed to bypass a temporary bug
          runtimeChunk: false
        },
        externals: {
        //   'react': 'React'
        },
        plugins: [
        //   new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('development')
        // }),
          new ModuleFederationPlugin({
            remotes: {},
            name: "addon",
            filename: "addon.js",
            exposes: {
             './AddonModule': './src/app/components/addon/index.ts',
              './AddonComponent': './src/app/components/addon/index.ts',

            },
            shared: {
              // ...deps,
              "@angular/core": { eager: true, singleton: true,  strictVersion: false  },
              "@angular/common": { eager: true,singleton: true,strictVersion: false   },
            }
          }),
        ],
          };

        const merged = merge(angularWebpackConfig, mfConfig);
        const singleSpaWebpackConfig = singleSpaAngularWebpack(merged, options);
        return singleSpaWebpackConfig;
    }
};
