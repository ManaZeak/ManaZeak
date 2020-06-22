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
    reporters: ['progress', 'coverage'],
    preprocessors: {
      './front/test/test-context.js': ['webpack', 'sourcemap']
      //'./static/js/core/**/*.js': ['webpack', 'sourcemap', 'coverage']
    },
    babelPreprocessor: {
      options: {
        presets: ['env'],
        sourceMap: true
      }
    },
    coverageReporter: {
      type : 'lcov',
      dir : './front/test/coverage/',
      subdir: (browser) => {
        // normalization process to keep a consistent browser name across different OS
        return browser.split(/[ /-]/)[0];
      },
      includeAllSources: true
    },
    webpack: {
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.js/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader'
              }
            ]
          }
        ]
      },
      watch: true,
      mode: 'development'
    },
    webpackServer: {
      noInfo: true
    }
  });
};
