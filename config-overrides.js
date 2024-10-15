const webpack = require('webpack');

module.exports = function override(config) {
    config.resolve.fallback = {
        process: require.resolve('process/browser.js'), // Ensure the extension is specified
        buffer: require.resolve('buffer'),
        assert: require.resolve('assert'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
    };

    config.plugins = (config.plugins || []).concat(
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
            Buffer: ['buffer', 'Buffer'],
        })
    );

    return config;
};