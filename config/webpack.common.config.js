const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PATHS = require('./paths');
const pkg = require('../package.json');

const devMode = process.env.NODE_ENV !== 'prod';

const config = {
  entry: {
    vendor: Object.keys(pkg.dependencies),
    app: './app/index.js'
  },
  output: {
    path: PATHS.outputPath,
    filename: '[name].bundle.[chunkhash].js',
    chunkFilename: '[name].bundle.[chunkhash].js'
  },
  resolve: {
    modules: [ 'app', 'node_modules', 'components', './' ],
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        include: PATHS.app,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        include: PATHS.app,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader : 'url-loader',
            options: {
              name: '[path][name].[ext]',
              context: PATHS.app,
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebPackPlugin({
      template: PATHS.template,
      favicon: PATHS.favicon,
      inject: true
    })
  ]
};

module.exports = config;
