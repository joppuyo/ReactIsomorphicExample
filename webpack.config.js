module.exports = {
    entry: "./browser.js",
    output: {
        path: "public/js",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};
