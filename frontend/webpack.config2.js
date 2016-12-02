var path = require('path')
var webpack = require('webpack')

var RELEASE = process.env.NODE_ENV == 'production' ? true : false;
var APP = process.env.APP || 'app'

var nodeEnvPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': RELEASE ? '"production"' : '"development"'
})

module.exports = {
  devtool: RELEASE ? '' : 'source-map',
  
  entry: './src/' + APP + '/index',
    
  output: {
    path: path.join(__dirname, 'dist'),
    filename: APP + '.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: RELEASE ? [

    nodeEnvPlugin,

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ] : [
    nodeEnvPlugin
  ],

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }

    ]
  }
};