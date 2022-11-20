const webpack = require('webpack');
const loaders = require('./loaders');
const plugins = require('./plugins');
const path = require('path');
const fs = require('fs');


const DIST = path.resolve(__dirname, '../../static/dist/');


// Default js/scss entrypoints for ManaZeak app and services
let entry = {
  manazeak: ['./front/js/StartSession.js', './front/scss/service/manazeak.scss'],
  auth: ['./front/scss/service/auth.scss'],
  menu: ['./front/scss/service/menu.scss'],
  account: ['./front/scss/service/account.scss'],
  admin: ['./front/scss/service/admin.scss'],
  mainpage: ['./front/scss/service/mainpage.scss'],
  // Authentication pages
  register: ['./front/js/auth/Register.js'],
  tellusmore: ['./front/js/auth/TellUsMore.js'],
  redirect: ['./front/js/auth/Redirect.js']
};


// Plugin loading, if files exists in plugin folder, time to append them to the build list
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


module.exports = {
  entry: entry,
  module: {
    rules: [
      loaders.JSLoader,
      loaders.CSSLoader
    ]
  },
  output: {
    path: DIST,
    filename: 'js/[name].bundle.js'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    plugins.CleanWebpackPlugin,
    plugins.ESLintPlugin,
    plugins.StyleLintPlugin,
    plugins.MiniCssExtractPlugin
  ]
};
