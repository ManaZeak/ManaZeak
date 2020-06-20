module.exports = env => {
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // Js minify
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // CSS minifier
  const path = require('path');

  const SRC = path.resolve(__dirname, 'static');
  const DIST = path.resolve(__dirname, 'static/dist');

  const cssLoaders = [{
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  }];

  if (env.prod === 'true') {
    cssLoaders.push({
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('autoprefixer')({
            browserlist: ['last 2 versions']
          })
        ]
      }
    });
  }
  // Default entrypoint for ManaZeak
  let entry = { manazeak: ['./front/js/StartSession.js', './front/scss/manazeak.scss'] };
  // Plugin loading
  const fs = require('fs');
  if (fs.existsSync('./plugins/MzkWorldMap/js/MzkWorldMap.js')) { // Bundle MzkWorldMap if existing
    entry.mzkworldmap = [
      './plugins/MzkWorldMap/js/MzkWorldMap.js',
      './plugins/MzkWorldMap/css/mzkworldmap.scss'
    ];
  }

  if (fs.existsSync('./plugins/MzkVisualizer/js/MzkVisualizer.js')) { // Bundle MzkVisualizer if existing
    entry.mzkvisualizer = [
      './plugins/MzkVisualizer/js/MzkVisualizer.js',
      './plugins/MzkVisualizer/css/mzkvisualizer.scss'
    ];
  }

  return {
    mode: (env.prod === 'true') ? 'production' : 'development',
    watch: (env.prod !== 'true'),
    entry: entry,
    stats: {
      warnings: (env.prod !== 'true'),
    },
    devtool: (env.prod === 'true') ? false : 'inline-source-map',
    output: {
      path: DIST,
      filename: 'js/[name].bundle.js'
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
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].bundle.css'
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
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }]
          },
          canPrint: true
        })
      ]
    }
  };
};
