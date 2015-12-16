var autoprefixer = require("autoprefixer");
var nestedCss = require("postcss-nested");

module.exports = {
    entry: {
        js: "./client_src/entry.js",
        html: "./client_src/index.html"
    },

    output: {
        path: "./client_dist",
        filename: "bundle.js"
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
            { test: /\.html$/, loader: "file?name=[name].[ext]" }
        ]
    },

    postcss: function () {
        return [
            nestedCss,
            autoprefixer,
            // cssnano //minification
        ];
    }
}
