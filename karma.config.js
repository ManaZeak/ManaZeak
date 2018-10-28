module.exports = function(config) {
  config.set({
    singleRun: true,
    browsers: ['Firefox'],
    frameworks: ['jasmine'],
    files: [
      './static/test/test-context.js'
      //'./static/js/core/**/*.js'
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      './static/test/test-context.js': ['webpack']
      //'./static/js/core/**/*.js': ['webpack', 'sourcemap', 'coverage']
    },
    babelPreprocessor: {
      options: {
        presets: ["env"],
        sourceMap: 'inline'
      }
    },
    coverageReporter: {
      type : 'lcov',
      dir : './static/test/coverage/',
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
