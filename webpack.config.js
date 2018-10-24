module.exports = env => {
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
  const path = require('path');

  const SRC = path.resolve(__dirname, 'static');
  const DIST = path.resolve(__dirname, 'static/dist');

  let cssLoaders = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
  ];

  if (env.prod === 'true') {
    cssLoaders.push({ // For production: we autoprefix all specific rules to fit most browsers need
      loader: 'postcss-loader',
      options: {
        plugins: (loader) => [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      }
    });
  }

  return {
    mode: (env.prod === 'true') ? 'production' : 'development',
    watch: (env.prod !== 'true'),
    entry: './static/js/Start.js',
    devtool: 'inline-source-map',
    output: {
      path: DIST,
      filename: 'js/manazeak.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            ...cssLoaders,
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['static/dist'], {
        root: path.resolve('./'),
        verbose: true,
        dry: false
      }),
      new MiniCssExtractPlugin({
          filename: 'css/manazeak.bundle.css'
      })
    ],
    resolve: {
      extensions: ['.js', '.scss'],
      modules: ['node_modules', SRC]
    },
    optimization: (env.prod !== 'true') ? {} :  {
      minimizer: [
        new UglifyJsPlugin(),
        new OptimizeCSSAssetsPlugin({
          assetNameRegExp: /\manazeak.bundle.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        })
      ]
    }
  };
};
