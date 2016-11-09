const bhttp = require("bhttp")
const querystring = require('querystring');
const tools = require('./tools')

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
      done(null, resp.body)
    }
  }
  
  return {
    loadModels:function(query, done){
      bhttp.get(getURL('', query), {
        decodeJSON:true
      }, resHandler(done))
    },
    loadModel:function(id, done){
      bhttp.get(getURL('/' + id), {
        decodeJSON:true
      }, resHandler(done))
    },
    addModel:function(data, done){
      bhttp.post(getURL(), data, {
        encodeJSON:true,
        decodeJSON:true
      }, resHandler(done))
    },
    saveModel:function(id, data, done){
      bhttp.patch(getURL('/' + id), data, {
        encodeJSON:true,
        decodeJSON:true
      }, resHandler(done))
    },
    deleteModel:function(id, done){
      bhttp.delete(getURL('/' + id), {
        
      }, resHandler(done))
    }
  }
}

module.exports = factory