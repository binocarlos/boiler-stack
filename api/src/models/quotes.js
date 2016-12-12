var async = require('async')
var Storage = require('../storage')
var Installations = require('./installations')
var Projects = require('./projects')
var littleid = require('./littleid')
var tools = require('../tools')

module.exports = function(opts){

  var quotes = littleid(Storage(Object.assign({}, opts, {
    model:'quotes'
  })))

  var installations = Installations()
  var projects = Projects()

  /*
  
    load all the quotes within one project
    
  */
  function loadInstallationQuotes(id, logger, done){
    installations.processId(id, logger, function(err, fullid){
      if(err) return done(err)
      quotes.loadModels(tools.encodeQuery({
        query:{
          installationid:fullid
        }
      }), logger, done)
    })
  }

  function loadProjectQuotes(id, logger, done){
    projects.processId(id, logger, function(err, fullid){
      if(err) return done(err)
      quotes.loadModels(tools.encodeQuery({
        query:{
          projectid:fullid
        }
      }), logger, done)
    })
  }

  function addProjectQuote(projectid, data, logger, done){
    async.waterfall([
      function(next){
        projects.loadModel(projectid, logger, next)
      },

      function(project, next){
        data.installationid = project.installationid
        data.projectid = project.id
        quotes.addModel(data, logger, next)
      }
    ], done)
  }

  return Object.assign({}, quotes, {
    loadInstallationQuotes:loadInstallationQuotes,
    loadProjectQuotes:loadProjectQuotes,
    addProjectQuote:addProjectQuote
  })
}