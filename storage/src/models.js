var mongoose = require('mongoose')
var Schema = mongoose.Schema

/*

  User
  
*/
var UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  data: {
    type:Schema.Types.Mixed,
    default:{}
  }
})

/*

  Account
  
*/
var CollaboratorSchema = new Schema({
  installationid: { type: Schema.Types.ObjectId, required: true },
  userid: { type: Schema.Types.ObjectId, required: true },
  permission: { type: String, required: true }
})

var InstallationSchema = new Schema({
  name: { type: String, required: true },
  littleid: { type: String, required: true }
})

/*

  Project
  
*/
var ProjectSchema = new Schema({
  name: { type: String, required: true },
  installationid: { type: Schema.Types.ObjectId, required: true },
  clientid: { type: Schema.Types.ObjectId, required: true },
  littleid: { type: String, required: true }
})

/*

  Quote
  
*/
var QuoteSchema = new Schema({
  name: { type: String, required: true },
  installationid: { type: Schema.Types.ObjectId, required: true },
  projectid: { type: Schema.Types.ObjectId, required: true },
  littleid: { type: String, required: true }
})

/*

  Client
  
*/
var ClientSchema = new Schema({
  name: { type: String, required: true },
  installationid: { type: Schema.Types.ObjectId, required: true },
  littleid: { type: String, required: true }
})


module.exports = function(opts){

  return {
    user:mongoose.model('users', UserSchema),
    installation:mongoose.model('installations', InstallationSchema),
    project:mongoose.model('projects', ProjectSchema),
    collaborator:mongoose.model('collaborators', CollaboratorSchema),
    client:mongoose.model('clients', ClientSchema),
    quote:mongoose.model('quotes', QuoteSchema)
  }
}