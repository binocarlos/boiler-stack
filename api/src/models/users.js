const Storage = require('../storage')
const littleid = require('./littleid')

module.exports = function(opts){

  var users = littleid(Storage(Object.assign({}, opts, {
    model:'users',
  })))

  return Object.assign({}, users, {
    loadModel:function(id, done){
      users.processId(id, function(err, fullid){
        if(err) return done(err)
        users.loadModel(fullid, done)
      })
    },
    saveModel:function(id, data, done){
      users.processId(id, function(err, fullid){
        if(err) return done(err)
        users.saveModel(fullid, data, done)
      })
    },
    deleteModel:function(id, done){
      users.processId(id, function(err, fullid){
        if(err) return done(err)
        users.deleteModel(fullid, done)
      })
    }
  })
}