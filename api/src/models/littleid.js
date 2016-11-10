const tools = require('../tools')

module.exports = function(storage){

  var addModel = storage.addModel

  storage.addModel = function(data, done){
    data.littleid = tools.littleid()
    addModel(data, done)
  }

  /*
  
    turn a short project id into a project long one
    
  */
  storage.processId = function(id, done){
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

  return storage
}