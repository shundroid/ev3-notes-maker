const webpack = require("webpack");

module.exports = {
  cache: true,
  entry: "./src/main.js",
  output: {
    path: "./public/js",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
          presets: ["es2015"]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};