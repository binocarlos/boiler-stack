const Storage = require('../storage')

module.exports = function(opts){

  var quotes = Storage(Object.assign({}, opts, {
    model:'quotes',
  }))

  return quotes
}