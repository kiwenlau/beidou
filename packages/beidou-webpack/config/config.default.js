'use strict';

const path = require('path');

module.exports = appInfo => ({
  webpack: {
    // keep this key name sync with webpack.common.js reservedKey
    custom: {
      depth: 1,
      cssExtract: true,
      // configPath: 'path/to/webpack/config/file',
    },
    mode: 'development',
    output: {
      path: './build',
      filename: '[name].js?[contenthash]',
      chunkFilename: '[name].js',
      publicPath: '/build/',
    },

    resolve: {
      extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        client: path.join(appInfo.baseDir, 'client'),
      },
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'manifest',
        cacheGroups: {
          default: false,
          vendors: false,
          manifest: {
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
      emitOnErrors: false,
    },

    devServer: {
      port: 6002,
      headers: { 'X-Custom-Header': 'yes' },
      hot: true,
      devMiddleware: {
        stats: {
          colors: true,
          chunks: false,
        },
        publicPath: '/build/',
      },
      static: {
        watch: true,
      },
      client: {
        logging: 'warn',
      },
    },

    experiments: {
      lazyCompilation: false,
    },
  },
});
