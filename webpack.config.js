const path = require('path');

const SRC = path.resolve(__dirname, 'static');
const DIST = path.resolve(__dirname, 'static/js/dist');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
  return {
    mode: (env.prod === 'true') ? 'production' : 'development',
    watch: (env.prod === 'true') ? false : true,
    entry: './static/js/Start.js',
    devtool: 'inline-source-map',
    output: {
        path: DIST,
        filename: 'manazeak.bundle.js'
    },
    module: {
  
    },
    resolve: {
        extensions: ['.js', 'scss'],
        modules: ['node_modules', SRC],
    },
    optimization: (env.prod !== 'true') ? {} :  {
      minimizer: [ new UglifyJsPlugin() ]
    }
  }
};
