const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//soluton 1:
const WebpackMd5Hash = require('webpack-md5-hash');
//solution 2:
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    //filename: 'main.js'
    filename: 'main.[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract(
      //     {
      //       fallback: 'style-loader',
      //       use: ['css-loader']
      //     })
      // }
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract(
      //     {
      //       fallback: 'style-loader',
      //       use: ['css-loader', 'sass-loader']
      //     })
      // }
      {
        test: /\.scss$/,
        //use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        use:  [  MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [ 
    new CleanWebpackPlugin('dist', {} ),
    //new ExtractTextPlugin({filename: 'style.css'}),

    // new ExtractTextPlugin(
    //   {filename: 'style.[chunkhash].css', disable: false, allChunks: true}),
    //soluton 1 to css hash issue: (together with WebpackMd5Hash plugin)
    // new ExtractTextPlugin(
    //   {filename: 'style.[hash].css', disable: false, allChunks: true}),
    //solution  2
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),

    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
  ],
};