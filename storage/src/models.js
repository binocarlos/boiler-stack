var mongoose = require('mongoose')
var Schema = mongoose.Schema

/*

  User
  
*/
var UserSchema = new Schema({
  name: { type: String, default: '' },
  type: { type: String, default: 'user' },
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  provider: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  data: {
    type:Schema.Types.Mixed,
    default:{}
  }
})


/*

  Project
  
*/
var CollaboratorSchema = new Schema({
  projectid: { type: Schema.Types.ObjectId, required: true },
  userid: { type: Schema.Types.ObjectId, required: true },
  permission: { type: String, required: true }
})

var ProjectSchema = new Schema({
  name: { type: String, required: true }
})


/*

  Quote
  
*/
var QuoteSchema = new Schema({
  name: { type: String, required: true },
  projectid: { type: Schema.Types.ObjectId, required: true }
})

module.exports = function(opts){

  return {
    user:mongoose.model('users', UserSchema),
    project:mongoose.model('projects', ProjectSchema),
    collaborator:mongoose.model('collaborators', CollaboratorSchema),
    quote:mongoose.model('quotes', QuoteSchema)
  }
}