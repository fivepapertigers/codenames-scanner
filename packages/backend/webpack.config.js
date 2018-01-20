/* eslint-env node */

const slsw = require("serverless-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: Object.assign({
        "tesseract/src/index": "./node_modules/tesseract.js/src/index.js",
        "tesseract/src/node/worker": "./node_modules/tesseract.js/src/node/worker.js"
    }, slsw.lib.entries),
    target: "node",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.json($|\?)/, use: "json-loader"
            }
        ]
    },
    devtool: "source-map",
    externals: ["aws-sdk"],
    plugins: [new CopyWebpackPlugin([{from: "eng.traineddata", to: "eng.traineddata"}])]
};
