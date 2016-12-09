const Storage = require('../storage')
const Installations = require('./installations')
const littleid = require('./littleid')
const tools = require('../tools')

module.exports = function(opts){

  var clients = littleid(Storage(Object.assign({}, opts, {
    model:'clients'
  })))

  var installations = Installations()

  /*
  
    load all the clients within one project
    
  */
  function loadInstallationClients(id, done){
    installations.processId(id, function(err, fullid){
      if(err) return done(err)
      var query = tools.encodeQuery({
        query:{
          installationid:fullid
        }
      })
      clients.loadModels(query, done)
    })
  }

  function addInstallationClient(id, data, done){
    installations.processId(id, function(err, fullid){
      if(err) return done(err)
      data.installationid = fullid
      clients.addModel(data, done)
    })
  }

  return Object.assign({}, clients, {
    loadInstallationClients:loadInstallationClients,
    addInstallationClient:addInstallationClient
  })
}