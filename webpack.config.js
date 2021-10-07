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
  // mode: "production",
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
          // MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader, 
          },
          {
            loader: "css-loader",
            options: {
              // url: false
            } 
          },
          {
            loader: 'resolve-url-loader',
            options: {
              attempts: 1,
              sourceMap: true
            }
          },
          {
            loader: "sass-loader"
          }
          // "css-loader",
          // "sass-loader"
        ]
      },
      {
        test: /\.css$/i,
        use: [
          // "style-loader",
          {
            loader: MiniCssExtractPlugin.loader, 
          },
          {
            loader: "css-loader",
            options: {
              // url: false,
              // url: true
            } 
          }
        ]
      },
      {
        test: /\.pug$/i,
        use: "pug-loader",
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        // include: path.join(__dirname, 'src/asset'),
        use: {
          loader: "file-loader",
          options: {
            esModule: false
          }
        }
      }
    ]
  }
}

