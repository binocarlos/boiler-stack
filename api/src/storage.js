var bhttp = require("bhttp")
var querystring = require('querystring');
var tools = require('./tools')

/*

  a proxy back to the storage service

  you give it the model name and it gives back data functions
  
*/

function factory(opts){
  opts = opts || {}

  if(typeof(opts.model) != 'string') throw new Error('storage proxy needs opts.model==string')

  function getURL(path, query){
    query = query ? '?' + querystring.stringify(query) : ''
    path = path || ''
    return tools.storageUrl('/api/v1/' + opts.model + path + query)
  }

  function resHandler(done){
    return function(err, resp){
      if(err) return done(err)
      if(resp.statusCode >= 400){
        return done(JSON.stringify(resp.body))
      }
      done(null, resp.body)
    }
  }
  
  return {
    loadModels:function(query, logger, done){
      bhttp.get(getURL('', query), {
        decodeJSON:true
      }, resHandler(done))
    },
    loadModel:function(id, logger, done){
      bhttp.get(getURL('/' + id), {
        decodeJSON:true
      }, resHandler(done))
    },
    addModel:function(data, logger, done){
      bhttp.post(getURL(), data, {
        encodeJSON:true,
        decodeJSON:true
      }, resHandler(done))
    },
    saveModel:function(id, data, logger, done){
      bhttp.patch(getURL('/' + id), data, {
        encodeJSON:true,
        decodeJSON:true
      }, resHandler(done))
    },
    deleteModel:function(id, logger, done){
      bhttp.delete(getURL('/' + id), {
        
      }, resHandler(done))
    }
  }
}

module.exports = factory