const Storage = require('../storage')
const Projects = require('./projects')
const littleid = require('./littleid')
const tools = require('../tools')

module.exports = function(opts){

  var clients = littleid(Storage(Object.assign({}, opts, {
    model:'clients'
  })))

  var projects = Projects()

  /*
  
    load all the clients within one project
    
  */
  function loadProjectClients(id, done){
    projects.processId(id, function(err, fullid){
      if(err) return done(err)
      var query = tools.encodeQuery({
        query:{
          projectid:fullid
        }
      })
      clients.loadModels(query, done)
    })
  }

  function addProjectClient(id, data, done){
    projects.processId(id, function(err, fullid){
      if(err) return done(err)
      data.projectid = fullid
      clients.addModel(data, done)
    })
  }

  return Object.assign({}, clients, {
    loadProjectClients:loadProjectClients,
    addProjectClient:addProjectClient
  })
}