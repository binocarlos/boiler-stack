var Storage = require('../storage')
var Installations = require('./installations')
var littleid = require('./littleid')
var tools = require('../tools')

module.exports = function(opts){

  var clients = littleid(Storage(Object.assign({}, opts, {
    model:'clients'
  })))

  var installations = Installations()

  /*
  
    load all the clients within one project
    
  */
  function loadInstallationClients(id, logger, done){
    installations.processId(id, logger, function(err, fullid){
      if(err) return done(err)
      var query = tools.encodeQuery({
        query:{
          installationid:fullid
        }
      })
      clients.loadModels(query, logger, done)
    })
  }

  function addInstallationClient(id, data, logger, done){
    installations.processId(id, logger, function(err, fullid){
      if(err) return done(err)
      data.installationid = fullid
      clients.addModel(data, logger, done)
    })
  }

  return Object.assign({}, clients, {
    loadInstallationClients:loadInstallationClients,
    addInstallationClient:addInstallationClient
  })
}