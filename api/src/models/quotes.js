const async = require('async')
const Storage = require('../storage')
const Installations = require('./installations')
const Projects = require('./projects')
const littleid = require('./littleid')
const tools = require('../tools')

module.exports = function(opts){

  var quotes = littleid(Storage(Object.assign({}, opts, {
    model:'quotes'
  })))

  var installations = Installations()
  var projects = Projects()

  /*
  
    load all the quotes within one project
    
  */
  function loadInstallationQuotes(id, done){
    installations.processId(id, function(err, fullid){
      if(err) return done(err)
      quotes.loadModels(tools.encodeQuery({
        query:{
          installationid:fullid
        }
      }), done)
    })
  }

  function loadProjectQuotes(id, done){
    projects.processId(id, function(err, fullid){
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
        data.installationid = project.installationid
        data.projectid = project.id
        quotes.addModel(data, next)
      }
    ], done)
  }

  return Object.assign({}, quotes, {
    loadInstallationQuotes:loadInstallationQuotes,
    loadProjectQuotes:loadProjectQuotes,
    addProjectQuote:addProjectQuote
  })
}