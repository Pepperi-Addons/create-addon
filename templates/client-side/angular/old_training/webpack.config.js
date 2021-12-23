const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const singleSpaAngularWebpack = require('single-spa-angular-webpack5/lib/webpack').default;
const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const deps = require('./package.json').dependencies;

module.exports = (config, options, env) => {

    config.plugins.push(
        new webpack.DefinePlugin({
          CLIENT_MODE: JSON.stringify(env.configuration),
        })
    )
// Only if you need standalone
    if (env.configuration === 'Standalone') {
        return config;
    }
    else {
        const mfConfig = {
            output: {
              uniqueName: "addon",
              publicPath: "auto"
            },
            optimization: {
              // Only needed to bypass a temporary bug
              runtimeChunk: false
            },
            plugins: [
              // new ModuleFederationPlugin({
              //   // remotes: {},
              //   name: "addon",
              //   filename: "addon.js",
              //   exposes: {
              //     './AddonComponent': './src/app/components/addon/index.ts',
              //     './AddonModule': './src/app/components/addon/index.ts'

              //   },
              //   shared: {
              //     // ...deps,
              //     "@angular/core": { eager:true,  singleton: true,   strictVersion: false  },
              //     "@angular/common": { eager:true,  singleton: true,  strictVersion: false   }
              //   }
              // })
            ],
          };
        const merged = merge(config, mfConfig);
        const singleSpaWebpackConfig = singleSpaAngularWebpack(merged, options);
        return singleSpaWebpackConfig;
    }

    // Feel free to modify this webpack config however you'd like to
};
