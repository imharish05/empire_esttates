const webpack = require('webpack');

module.exports = function override(config, env) {
    // Add polyfills for node core modules
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "process": require.resolve("process/browser")
    });
    config.resolve.fallback = fallback;

    // Provide process globally
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ]);

    return config;
};
