module.exports = {
    mode: "production",
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                styles: {
                    minSize: 0,
                    test: /\.css$/,
                    minChunks: 2,
                },
            },
        },
    },
};