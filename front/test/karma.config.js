module.exports = function (config) {
    config.set({
        basePath: '../..',
        singleRun: !config.dev, // Keep browser open in dev mode
        browsers: !config.dev ? ['FirefoxHeadless', 'ChromeHeadlessNoSandbox'] : ['Firefox'],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromiumHeadless',
                flags: [
                    '--no-sandbox', // required to run without privileges in docker
                    '--user-data-dir=/tmp/chrome-test-profile'
                ]
            }
        },
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('karma-firefox-launcher')
        ],
        client: {
            jasmine: {
                random: false
            },
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: ['lcovonly'],
            fixWebpackSourcePaths: true,
            dir: '/__w/ManaZeak/ManaZeak/coverage',
            verbose: true
        },
        files: [
            './front/test/test-context.js'
        ],
        proxies: {
            '/static/': '/base/test/static/'
        },
        reporters: ['progress', 'coverage-istanbul'],
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
            devtool: 'inline-source-map',
            module: {
                rules: [{
                    test: /\.js/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'babel-loader'},
                        "coverage-istanbul-loader"
                    ]
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
