var mongoose = require('mongoose')

module.exports = function(opts){

  return mongoose.model('project', new mongoose.Schema({
    name: { type: String, required: true },
    comment: { type: String }
  }))

}