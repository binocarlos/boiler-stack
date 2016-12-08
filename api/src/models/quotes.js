const async = require('async')
const Storage = require('../storage')
const Accounts = require('./accounts')
const Projects = require('./projects')
const littleid = require('./littleid')
const tools = require('../tools')

module.exports = function(opts){

  var quotes = littleid(Storage(Object.assign({}, opts, {
    model:'quotes'
  })))

  var accounts = Accounts()
  var projects = Projects()

  /*
  
    load all the quotes within one project
    
  */
  function loadAccountQuotes(id, done){
    accounts.processId(id, function(err, fullid){
      if(err) return done(err)
      quotes.loadModels(tools.encodeQuery({
        query:{
          accountid:fullid
        }
      }), done)
    })
  }

  function loadProjectQuotes(id, done){
    accounts.processId(id, function(err, fullid){
      if(err) return done(err)
      quotes.loadModels(tools.encodeQuery({
        query:{
          projectid:fullid
        }
      }), done)
    })
  }

  function addProjectQuote(projectid, data, done){
    async.waterfall([
      function(next){
        projects.loadModel(projectid, next)
      },

      function(project, next){
        data.accountid = project.accountid
        data.projectid = project.id
        quotes.addModel(data, next)
      }
    ], done)
  }

  return Object.assign({}, quotes, {
    loadAccountQuotes:loadAccountQuotes,
    loadProjectQuotes:loadProjectQuotes,
    addProjectQuote:addProjectQuote
  })
}