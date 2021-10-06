const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/i,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/i,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
        ]
      },
      {
        test: /\.pug$/i,
        use: "pug-loader",
      },
      // {
      //   test: /\.svg$/i,
      //   use: "file-loader",
      //   // use: [
      //   //   {
      //   //     loader: "file-loader",
      //   //     // options: {
      //   //     //   esModule: false
      //   //     // }
      //   //   },
      //   // ]
      // },
    ]
  }
}

