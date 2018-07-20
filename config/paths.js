const path = require('path');

module.exports = {
  root: path.resolve(__dirname),
  app: path.resolve(__dirname, '../', 'app'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  recordsPath: path.join(__dirname, '../build', 'records.json'),
  template: './app/index.ejs',
  favicon: './app/favicon.ico'
};
