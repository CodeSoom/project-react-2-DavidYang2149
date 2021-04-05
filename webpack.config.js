const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const DEVELOPMENT_ENV = 'development';
const PRODUCTION_ENV = 'production';

const mode = process.env.NODE_ENV || DEVELOPMENT_ENV;

const pathBuild = path.resolve(__dirname, 'build');
const pathSrc = path.resolve(__dirname, 'src');
const pathIndex = path.resolve(__dirname, 'src', 'index.jsx');
const pathHtml = path.resolve(__dirname, 'public', 'index.html');

module.exports = {
  mode,
  devtool: 'cheap-eval-source-map',
  entry: {
    main: pathIndex,
  },
  output: {
    path: pathBuild,
    filename: mode === PRODUCTION_ENV
      ? 'static/js/[name].[contenthash:8].js'
      : mode === DEVELOPMENT_ENV && 'static/js/bundle.js',
    publicPath: mode === PRODUCTION_ENV
      ? './'
      : mode === DEVELOPMENT_ENV && '/',
    // publicPath: './',  // './' : for build, '/' : for dev
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          maxSize: 50000,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|PNG|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/media',
          limit: 10000,
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/media',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        include: pathSrc,
      },
    ],
  },
  devServer: {
    overlay: true,
    port: 9090,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: pathHtml,
      templateParameters: {
        env: mode === DEVELOPMENT_ENV ? '(개발모드)' : '',
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/images', to: './images' },
      ],
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
    // new BundleAnalyzerPlugin(),
  ],
};
