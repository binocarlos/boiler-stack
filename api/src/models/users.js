var Storage = require('../storage')
var littleid = require('./littleid')

module.exports = function(opts){

  var users = Storage(Object.assign({}, opts, {
    model:'users',
  }))

  return users
}