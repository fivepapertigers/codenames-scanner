const slsw = require("serverless-webpack");
const webpack = require("webpack");

module.exports = {
    entry: slsw.lib.entries,
    target: "node",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader"
            }
        }, { test: /\.json($|\?)/, use: "json-loader" }]
    },
    plugins: [new webpack.IgnorePlugin(/\/iconv-loader$/)]
};
