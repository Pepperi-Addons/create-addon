const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const webpack = require('webpack');

module.exports = (config, options, env) => {
    config.plugins.push(
        new webpack.DefinePlugin({
          CLIENT_MODE: JSON.stringify(env.configuration),
        })
    )       
    
    const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);
          
    if (env.configuration === 'Standalone') {
        return config;
    }
    else {
        return singleSpaWebpackConfig;
    }


    // Feel free to modify this webpack config however you'd like to
};
