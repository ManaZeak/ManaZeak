module.exports = function(config) {
  config.set({
    basePath: '../..',
    singleRun: false,
    browsers: ['Firefox'],
    frameworks: ['jasmine'],
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
