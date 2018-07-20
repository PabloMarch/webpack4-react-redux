const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PATHS = require('./paths');

const config = {
  mode: 'production',
  // devtool: 'source-map',
  stats: {
    colors: true,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  recordsPath: PATHS.recordsPath,
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true,
          ecma: 6,
          output: {
            comments: false
          },
          compress: {
            dead_code: true,
            drop_console: true
          },
          sourceMap: false
        }
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('prod')
    }),
    new CleanWebPackPlugin(PATHS.outputPath, {
      root: process.cwd(),
      verbose: true,
      dry: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new MiniCssExtractPlugin({
      filename: 'app.bundle.[chunkhash].css'
    }),
  ]
};

module.exports = config;
