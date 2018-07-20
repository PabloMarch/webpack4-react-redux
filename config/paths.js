const path = require('path');

module.exports = {
  app: path.resolve(__dirname, '../', 'app'),
  template: './app/index.ejs',
  favicon: './app/favicon.ico',
  outputPath: path.resolve(__dirname, '../', 'build'),
  root: path.resolve(__dirname),
};
