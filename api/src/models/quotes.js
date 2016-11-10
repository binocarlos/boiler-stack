const Storage = require('../storage')
const littleid = require('./littleid')

module.exports = function(opts){

  var quotes = littleid(Storage(Object.assign({}, opts, {
    model:'quotes',
  })))

  /*
  
    load all the quotes within one project
    
  */
  function loadProjectQuotes(projectid, done){

    quotes.loadModels(encodeQuery({
      query:{
        projectid:projectid
      }
    }), done)

  }

  return Object.assign({}, quotes, {
    loadProjectQuotes:loadProjectQuotes,
    loadModel:function(id, done){
      quotes.processId(id, function(err, fullid){
        if(err) return done(err)
        quotes.loadModel(fullid, done)
      })
    },
    saveModel:function(id, data, done){
      quotes.processId(id, function(err, fullid){
        if(err) return done(err)
        quotes.saveModel(fullid, data, done)
      })
    },
    deleteModel:function(id, done){
      quotes.processId(id, function(err, fullid){
        if(err) return done(err)
        quotes.deleteModel(fullid, done)
      })
    }
  })
}