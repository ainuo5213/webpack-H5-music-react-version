const { merge } = require("webpack-merge")
const baseConfig = require("./webpack.base.config")
const devConfig = require("./webpack.dev.config")
const prodConfig = require("./webpack.prod.config")

module.exports = env => {
    const isDevelopment = env.mode === "development";
    if (isDevelopment) {
        return merge(baseConfig, devConfig);
    }

    return merge(baseConfig, prodConfig);
}