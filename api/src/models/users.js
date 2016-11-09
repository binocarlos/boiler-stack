const Storage = require('../storage')

module.exports = function(opts){

  var users = Storage(Object.assign({}, opts, {
    model:'users',
  })

  return users
}