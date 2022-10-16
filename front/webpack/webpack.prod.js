const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');


module.exports = merge(common, {
  mode: 'production',
  target: ['web', 'es5'] // Transpile module to es5 JavaScript
});
