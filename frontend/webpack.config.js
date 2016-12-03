const webpack = require('webpack')
const path = require('path')
const buildPath = path.resolve(__dirname, 'dist')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')

var RELEASE = process.env.NODE_ENV == 'production' ? true : false;
var APP = process.env.APP || 'app'

const config = {
  entry: [path.join(__dirname, '/src/' + APP + '/index.js')],
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

    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.NoErrorsPlugin()

  ],
  module: {
    noParse: [ "react", "react-dom" ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [nodeModulesPath]
      },
    ],
  },
};

module.exports = config;