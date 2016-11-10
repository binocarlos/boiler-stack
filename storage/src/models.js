var mongoose = require('mongoose')
var Schema = mongoose.Schema
var UserSchemaFactory = require('passport-service/app/models/user')

var UserSchema = UserSchemaFactory(mongoose, 'users')

/*

  Project
  
*/
var CollaboratorSchema = new Schema({
  projectid: { type: Schema.Types.ObjectId, required: true },
  userid: { type: Schema.Types.ObjectId, required: true },
  permission: { type: String, required: true }
})

var ProjectSchema = new Schema({
  name: { type: String, required: true },
  littleid: { type: String, required: true }
})

/*

  Quote
  
*/
var QuoteSchema = new Schema({
  name: { type: String, required: true },
  projectid: { type: Schema.Types.ObjectId, required: true },
  littleid: { type: String, required: true }
})

/*

  Client
  
*/
var ClientSchema = new Schema({
  name: { type: String, required: true },
  projectid: { type: Schema.Types.ObjectId, required: true },
  littleid: { type: String, required: true }
})


module.exports = function(opts){

  return {
    user:mongoose.model('users', UserSchema),
    project:mongoose.model('projects', ProjectSchema),
    collaborator:mongoose.model('collaborators', CollaboratorSchema),
    client:mongoose.model('clients', ClientSchema),
    quote:mongoose.model('quotes', QuoteSchema)
  }
}