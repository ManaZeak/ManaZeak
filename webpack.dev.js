const path = require('path');

module.exports = {
    entry: './static/js/Start.js',
    output: {
        path: path.resolve(__dirname, 'static/js/dist'),
        filename: 'manazeak.bundle.js'
    },
    module: {
        // rules: [
        //     {
        //         test: /\.jsx?$/,
        //         include: [
        //             path.resolve(__dirname, "static/js")
        //         ],
        //         loader: "babel-loader",
        //         // the loader which should be applied, it'll be resolved relative to the context
        //         // -loader suffix is no longer optional in webpack2 for clarity reasons
        //         // see webpack 1 upgrade guide
        //         options: {
        //             presets: ["es2015"]
        //         }
        //     }
        // ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "static/js")
        ],
        extensions: [".js"]
    }
};
