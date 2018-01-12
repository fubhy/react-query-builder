const path = require('path');
const DefinePlugin = require('webpack').DefinePlugin;
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const root = path.resolve(process.cwd(), '..', '..');
const env = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: 'source-map',

  entry: {
    app: path.resolve(process.cwd(), 'src', 'index'),
  },

  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle-[chunkHash].js',
    chunkFilename: '[name]-[chunkHash].js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: env === 'development',
    }),
    new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env) }),
  ].concat(
    env === 'production'
      ? [
          new UglifyJsPlugin({
            minimize: true,
            compress: false,
            sourceMap: true,
          }),
        ]
      : [],
  ),

  resolve: {
    modules: [path.join(root, 'node_modules')],
    alias: {
      'react-query-builder': path.join(
        root,
        'packages',
        'react-query-builder',
        'src',
        'index',
      ),
    },
  },

  resolveLoader: {
    modules: [path.join(root, 'node_modules')],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              extends: path.join(process.cwd(), '.babelrc'),
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },
    ],
  },

  devServer: {
    inline: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },
};
