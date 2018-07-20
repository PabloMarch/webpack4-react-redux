const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PATHS = require('./paths');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: './app/index.js'
  },
  output: {
    path: PATHS.outputPath,
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [ 'app', 'node_modules', 'components', './' ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
