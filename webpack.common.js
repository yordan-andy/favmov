const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/app.js",
        detail: "./src/detail.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash:20].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ["app"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/detail.html",
            filename: "detail.html",
            chunks: ["detail"],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/images"),
                    to: path.resolve(__dirname, "dist/images"),
                },
            ],
        }),
    ],
};
