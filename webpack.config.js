const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const index = {
  template: "./src/template/index.pug",
  filename: "index.html",
  chunks: ["index"]
}

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: "./src/index.js"
  },
  output: {
    publicPath: "/",
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  devServer: {
    host: "localhost",
    port: 8080,
    devMiddleware: {
      writeToDisk: true
    },
    historyApiFallback: {
      index: "/"
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new HtmlWebpackPlugin(index),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ]
      },
      {
        test: /\.pug$/i,
        use: "pug-loader",
      },
    ]
  }
}

