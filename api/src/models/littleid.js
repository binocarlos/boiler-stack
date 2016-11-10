const tools = require('../tools')

module.exports = function(storage){

  function processId(id, done){
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
      }), function(err, data){
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
    addModel:function(data, done){
      data.littleid = tools.littleid()
      storage.addModel(data, done)
    },
    loadModel:function(id, done){
      processId(id, function(err, fullid){
        if(err) return done(err)
        storage.loadModel(fullid, done)
      })
    },
    saveModel:function(id, data, done){
      processId(id, function(err, fullid){
        if(err) return done(err)
        storage.saveModel(fullid, data, done)
      })
    },
    deleteModel:function(id, done){
      processId(id, function(err, fullid){
        if(err) return done(err)
        storage.deleteModel(fullid, done)
      })
    }
  })
}