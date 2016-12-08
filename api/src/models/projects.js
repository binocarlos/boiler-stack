const async = require('async')
const Storage = require('../storage')
const Accounts = require('./accounts')
const littleid = require('./littleid')
const tools = require('../tools')

module.exports = function(opts){

  var projects = littleid(Storage(Object.assign({}, opts, {
    model:'projects'
  })))

  var accounts = Accounts()

  /*
  
    load all the quotes within one project
    
  */
  function loadAccountProjects(id, done){
    accounts.processId(id, function(err, fullid){
      if(err) return done(err)
      projects.loadModels(tools.encodeQuery({
        query:{
          accountid:fullid
        }
      }), done)
    })
  }

  function addAccountProject(id, data, done){
    accounts.processId(id, function(err, fullid){
      if(err) return done(err)
      data.accountid = fullid
      projects.addModel(data, done)
    })
  }

  return Object.assign({}, projects, {
    loadAccountProjects:loadAccountProjects,
    addAccountProject:addAccountProject
  })
}