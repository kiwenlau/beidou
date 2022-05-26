'use strict';

const path = require('path');

module.exports = (app, defaultConfig, entry, isDev) => {
  const outputPath = path.join(app.config.baseDir, 'build');
  const factory = app.webpackFactory;

  factory.reset({
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: factory.getConfig().entry,
    output: {
      path: outputPath,
      filename: '[name].js?[contenthash]',
      chunkFilename: '[name].js',
      publicPath: '/build/',
    },
    module: {
      strictExportPresence: true,
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
      alias: {
        client: '../client',
      },
    },
    devServer: {
      devMiddleware: {
        publicPath: '/build/',
      },
    },
  });

  return factory.getConfig();
};
