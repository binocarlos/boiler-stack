var tools = require('../tools')

module.exports = function(storage){

  function processId(id, logger, done){
    if(!id) return done('no id passed')
    if(tools.isLittleId(id)){

      // find a model with that littleid
      storage.loadModels(tools.encodeQuery({
        query:{
          littleid:id
        },
        select:{
          _id:1
        }
      }), logger, function(err, data){
        if(err) return done(err)
        if(!data || data.length<=0) return done('no model found')
        done(null, data[0]._id)
      })
    }
    else{
      done(null, id)
    }
  }

  return Object.assign({}, storage, {
    processId:processId,
    addModel:function(data, logger, done){
      data.littleid = tools.littleid()
      storage.addModel(data, logger, done)
    },
    loadModel:function(id, logger, done){
      processId(id, logger, function(err, fullid){
        if(err) return done(err)
        storage.loadModel(fullid, logger, done)
      })
    },
    saveModel:function(id, data, logger, done){
      processId(id, logger, function(err, fullid){
        if(err) return done(err)
        storage.saveModel(fullid, data, logger, done)
      })
    },
    deleteModel:function(id, logger, done){
      processId(id, logger, function(err, fullid){
        if(err) return done(err)
        storage.deleteModel(fullid, logger, done)
      })
    }
  })
}