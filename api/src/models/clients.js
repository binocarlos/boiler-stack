const Storage = require('../storage')
const littleid = require('./littleid')

module.exports = function(opts){

  var clients = littleid(Storage(Object.assign({}, opts, {
    model:'clients',
  })))

  /*
  
    load all the clients within one project
    
  */
  function loadProjectClients(projectid, done){

    clients.loadModels(encodeQuery({
      query:{
        projectid:projectid
      }
    }), done)

  }

  return Object.assign({}, clients, {
    loadProjectClients:loadProjectClients,
    loadModel:function(id, done){
      clients.processId(id, function(err, fullid){
        if(err) return done(err)
        clients.loadModel(fullid, done)
      })
    },
    saveModel:function(id, data, done){
      clients.processId(id, function(err, fullid){
        if(err) return done(err)
        clients.saveModel(fullid, data, done)
      })
    },
    deleteModel:function(id, done){
      clients.processId(id, function(err, fullid){
        if(err) return done(err)
        clients.deleteModel(fullid, done)
      })
    }
  })
}