'use strict';

var webpack = require('webpack');

module.exports = {
  // Entry point for static analyzer
  entry: {
    app: [
      `webpack-dev-server/client?http://${process.env.HOST}:${process.env.HRPORT}`,
      'webpack/hot/dev-server',
      './js/main.js'
    ]
  },

  output: {
    // Where to build results
    path: __dirname + '/assets',

    // Filename to use in HTML
    filename: 'bundle.js',

    // Path to use in HTML
    publicPath: '/assets/'
  },

  resolve: {
    // Absolute path that contains modules
    root: __dirname,

    // Directory names to be searched for modules
    modulesDirectories: ['js', 'views', 'node_modules'],

    // Replace modules with other modules or paths for compatibility or convenience
    alias: {
      'underscore': 'lodash'
    }
  },

  plugins: process.env.NODE_ENV == 'production' ? [
     new webpack.HotModuleReplacementPlugin()
  ] : null,

  module: {
    preLoaders: [
      {test: /\.jsx$/, loader: 'eslint', exclude: /node_modules/},
    ],
    loaders: [
      {test: /\.jsx?$/, loaders: ['react-hot', 'babel?experimental&blacklist[]=validation.react'], exclude: /node_modules/},
      {test: /\.scss$/, loaders: ['style', 'css', 'autoprefixer', 'sass']},
      {test: /\.css$/, loaders: ['style', 'css', 'autoprefixer']},
      {test: /\.json$/, loaders: ['json']},
      {test: /\.png$/, loader: 'url?limit=8192&mimetype=image/png'},
      {test: /\.jpe?g$/, loader: 'url?limit=8192&mimetype=image/jpg'},
      {test: /\.gif$/, loader: 'url?limit=8192&mimetype=image/gif'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=image/svg+xml'},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/font-woff2'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.md$/, loaders: ['html', 'markdown']}
    ]
  },

  devtool: '#inline-source-map',

  eslint: {
    emitErrors: true,
    reporter: function(results) {
      return results.map(function(result) {
        return result.messages.map(function(msg) {
          return (
            ' ' + msg.message + '(' + msg.ruleId + ')' +
            ' @ line ' + msg.line + ' column ' + msg.column +
            ' - ' +
            (msg.fatal ? 'fatal, ' : '') +
            'severity: ' + msg.severity
          );
        }).join('\n');
      }).join('\n');
    }
  }
};
