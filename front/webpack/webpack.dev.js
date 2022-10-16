const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const path = require('path');


module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
  watch: true,
  stats: {
    warnings: true,
  },
  devtool: 'inline-source-map'
});
