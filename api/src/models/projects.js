var async = require('async')
var Storage = require('../storage')
var Installations = require('./installations')
var littleid = require('./littleid')
var tools = require('../tools')

module.exports = function(opts){

  var projects = littleid(Storage(Object.assign({}, opts, {
    model:'projects'
  })))

  var installations = Installations()

  /*
  
    load all the quotes within one project
    
  */
  function loadInstallationProjects(id, logger, done){
    installations.processId(id, logger, function(err, fullid){
      if(err) return done(err)
      projects.loadModels(tools.encodeQuery({
        query:{
          installationid:fullid
        }
      }), logger, done)
    })
  }

  function addInstallationProject(id, data, logger, logger, done){
    installations.processId(id, logger, function(err, fullid){
      if(err) return done(err)
      data.installationid = fullid
      projects.addModel(data, logger, done)
    })
  }

  return Object.assign({}, projects, {
    loadInstallationProjects:loadInstallationProjects,
    addInstallationProject:addInstallationProject
  })
}