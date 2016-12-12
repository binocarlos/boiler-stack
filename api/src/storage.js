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

  function requestHandler(handler, logInfo, logger, done){
    logger.debug({
      logInfo:logInfo
    }, 'request - ' + logInfo.method + ' ' + logInfo.url)
    
    handler(function(err, resp){    
      if(err){
        logger.error({
          error:err.toString()
        }, 'error - ' + logInfo.method + ' ' + logInfo.url)
        return done(err)
      }
      if(resp.statusCode >= 400){
        logger.error({
          statusCode:resp.statusCode,
          headers:resp.headers,
          body:resp.body.toString()
        }, 'bad status code - ' + resp.statusCode + ' - ' + logInfo.method + ' ' + logInfo.url)
        return done(resp.body.toString())
      }
      var jsonBody = resp.body
      logger.debug({
        headers:resp.headers,
        jsonBody:jsonBody
      }, 'response - ' + resp.statusCode + ' - ' + logInfo.method + ' ' + logInfo.url)
      done(null, jsonBody)
    })
  }
  
  return {
    loadModels:function(query, logger, done){
      var url = getURL('', query)
      requestHandler(function(callback){
        bhttp.get(url, {
          headers:{
            'x-tracer-id':logger.id
          }
        }, callback)
      }, {
        url:url,
        method:'get',
        action:'loadModels:' + opts.model,
        query:query
      }, logger, done)
    },
    loadModel:function(id, logger, done){
      var url = getURL('/' + id)
      requestHandler(function(callback){
        bhttp.get(url, {
          headers:{
            'x-tracer-id':logger.id
          }
        }, callback)
      }, {
        url:url,
        method:'get',
        action:'loadModel:' + opts.model,
        id:id
      }, logger, done)
    },
    addModel:function(data, logger, done){
      var url = getURL()
      requestHandler(function(callback){
        bhttp.post(url, data, {
          encodeJSON:true,
          headers:{
            'x-tracer-id':logger.id
          }
        }, callback)
      }, {
        url:url,
        method:'post',
        action:'addModel:' + opts.model,
        data:data
      }, logger, done)
    },
    saveModel:function(id, data, logger, done){
      var url = getURL('/' + id)
      requestHandler(function(callback){
        bhttp.patch(url, data, {
          encodeJSON:true,
          headers:{
            'x-tracer-id':logger.id
          }
        }, callback)
      }, {
        url:url,
        method:'patch',
        action:'saveModel:' + opts.model,
        data:data
      }, logger, done)
    },
    deleteModel:function(id, logger, done){
      var url = getURL('/' + id)
      requestHandler(function(callback){
        bhttp.delete(url, {
          headers:{
            'x-tracer-id':logger.id
          }
        }, callback)
      }, {
        url:url,
        method:'delete',
        action:'deleteModel:' + opts.model
      }, logger, done)
    }
  }
}

module.exports = factory