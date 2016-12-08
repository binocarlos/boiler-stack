const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const buildPath = path.resolve(__dirname, 'dist')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')

var RELEASE = process.env.NODE_ENV == 'production' ? true : false;
var APP = process.env.APP || 'user'

var APP_FOLDER = 'app_' + APP

var includePaths = [
  fs.realpathSync(__dirname + '/src')
];

const config = {
  entry: [path.join(__dirname, '/src/' + APP_FOLDER + '/index.js')],
  devtool: 'source-map',
  output: {
    path: buildPath,
    filename: APP + '.js'
  },
  plugins: RELEASE ? [
    
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin()
  ] : [

    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.NoErrorsPlugin()

  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        babelrc: false,
        include: includePaths,
        cacheDirectory: true,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    fallback: path.join(__dirname, "node_modules")
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  }
}

module.exports = config;