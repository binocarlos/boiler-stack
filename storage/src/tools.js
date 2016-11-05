var mongoose = require('mongoose')
var bluebird = require('bluebird')
mongoose.Promise = require('bluebird')

function connectToMongo(args){
  var connectionUrl = 'mongodb://' + args.host + ':' + args.port + '/' + args.database
  mongoose.connect(connectionUrl)
}

module.exports = {
  connectToMongo:connectToMongo
}