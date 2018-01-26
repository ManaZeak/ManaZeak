const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './static/js/Start.js',
    output: {
        path: path.resolve(__dirname, 'static/js/dist'),
        filename: 'manazeak.bundle.js'
    },
    plugins: [
        new UglifyJsPlugin()
    ],
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "static/js")
        ],
        extensions: [".js"]
    }
};
