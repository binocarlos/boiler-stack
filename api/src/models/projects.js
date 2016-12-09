const async = require('async')
const Storage = require('../storage')
const Installations = require('./installations')
const littleid = require('./littleid')
const tools = require('../tools')

module.exports = function(opts){

  var projects = littleid(Storage(Object.assign({}, opts, {
    model:'projects'
  })))

  var installations = Installations()

  /*
  
    load all the quotes within one project
    
  */
  function loadInstallationProjects(id, done){
    installations.processId(id, function(err, fullid){
      if(err) return done(err)
      projects.loadModels(tools.encodeQuery({
        query:{
          installationid:fullid
        }
      }), done)
    })
  }

  function addInstallationProject(id, data, done){
    installations.processId(id, function(err, fullid){
      if(err) return done(err)
      data.installationid = fullid
      projects.addModel(data, done)
    })
  }

  return Object.assign({}, projects, {
    loadInstallationProjects:loadInstallationProjects,
    addInstallationProject:addInstallationProject
  })
}