const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "js/[name].[chunkhash:5].js",
        publicPath: "/",
        path: path.join(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".json", ".jsx"],
        alias: {
            "@": path.join(__dirname, "src")
        },
    },
    stats: {
        colors: true,
        modules: false,
        entrypoints: false,
        children: false,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|bmp|eot|woff|ttf|json)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "static/images/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../images/"
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                        }
                    }
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../images/"
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        }
                    },
                    "less-loader"
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "src", "static"),
                    to: "./static",
                },
            ],
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css",
            chunkFilename: "static/css/common.[hash:5].css",
        })
    ]
}