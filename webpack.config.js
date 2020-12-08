const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

    ],
  },
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   filename: 'main.js',
  //   publicPath: '/project-react-2-DavidYang2149',
  // },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 9090,
    historyApiFallback: {
      index: './index.html',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './index.html',
    // }),
    // new MiniCssExtractPlugin({
    //   filename: 'styles.css',
    //   chunkFilename: 'styles.css',
    // }),
  ],

};
