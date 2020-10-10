module.exports = function(config) {
  config.set({
    basePath: '../..',
    singleRun: !config.dev, // Keep browser open in dev mode
    browsers: ['Firefox', 'Chromium'],
    frameworks: ['jasmine'],
    client: {
      jasmine: {
        random: !config.dev // Randomized in !dev mode
      }
    },
    files: [
      './front/test/test-context.js'
    ],
    proxies: {
      '/static/': '/base/test/static/'
    },
    reporters: ['progress'],
    preprocessors: {
      './front/test/test-context.js': ['webpack', 'sourcemap']
    },
    babelPreprocessor: {
      options: {
        presets: ['env'],
        sourceMap: true
      }
    },
    webpack: {
      devtool: 'source-map',
      module: {
        rules: [{
          test: /\.js/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader'
          }]
        }]
      },
      watch: true,
      mode: 'development'
    },
    webpackServer: {
      noInfo: true
    }
  });
};
