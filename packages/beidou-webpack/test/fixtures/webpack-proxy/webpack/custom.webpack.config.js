'use strict';

const path = require('path');

const outputPath = path.resolve(__dirname, '../build');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: ['./client/index.js'],
  },
  output: {
    path: outputPath,
    filename: '[name].js?[contenthash]',
    chunkFilename: '[name].js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  watchOptions: {
    aggregateTimeout: 300,
  },
  experiments: {
    lazyCompilation: false,
  },
  devServer: {
    client: {
      logging: 'warn',
    },
    headers: { 'X-Custom-Header': 'yes' },
    devMiddleware: {
      stats: {
        colors: true,
        chunks: false,
      },
      publicPath: '/build/',
    },
    hot: true,
    proxy: {
      '/foo': {
        target: 'http://127.0.0.1:6001',
        pathRewrite: { '^/foo': '/proxy' },
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
