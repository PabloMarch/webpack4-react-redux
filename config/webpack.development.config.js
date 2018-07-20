// const webpack = require('webpack');
const PATHS = require('./paths');

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: PATHS.outputPath,
        compress: true,
        historyApiFallback: true,
        hot: false,
        port: 8080
    }
};

module.exports = config;
