var bhttp = require('bhttp')
var hat = require('hat')
var concat = require('concat-stream')

function errorWrapper(logger, res, fn, errorCode){
  errorCode = errorCode || 500
  return function(err, data){
    if(err){
      logger.error(data, err)
      res.statusCode = errorCode
      res.end(err.toString())
      return
    }
    fn(data)
  }
}

function jsonRequestWrapper(req, res, done){
  req.pipe(concat(function(data){
    var stringData = data.toString()
    var jsonData = null
    try{
      jsonData = JSON.parse(stringData)
    } catch(err) {
      req.log.error({
        data:stringData
      }, err.toString())
      res.statusCode = 500
      res.end(err.toString())
      return
    }
    done(jsonData)
  }))
}

function jsonResponseWrapper(logger, res, opts){
  opts = opts || {}
  return errorWrapper(logger, res, function(data){
    data = opts.filter ? opts.filter(data) : data
    res.setHeader('Content-type', 'application/json')
    res.end(JSON.stringify(data))  
  }, opts.code)
}

function authUrl(path){
  var url = 'http://' + process.env.AUTH_SERVICE_HOST + ':' + process.env.AUTH_SERVICE_PORT
  return path ? url + path : url
}

function diggerUrl(path){
  var url = 'http://' + process.env.DIGGER_SERVICE_HOST + ':' + process.env.DIGGER_SERVICE_PORT
  return path ? url + path : url
}

function storageUrl(path){
  var url = 'http://' + process.env.STORAGE_SERVICE_HOST + ':' + process.env.STORAGE_SERVICE_PORT
  return path ? url + path : url
}

var AUTH_PATH = '/auth/v1/status'

function loadUser(cookie, done){
  bhttp.get(authUrl(AUTH_PATH), {
    decodeJSON:true,
    headers:{
      cookie:cookie
    }
  }, function(err, authResp){
    if(err) return done(err)
    done(null, authResp.body)
  })
}

const LITTLEID_LENGTH = 8

function littleid(){
  return hat().substring(0,LITTLEID_LENGTH)
}

function isLittleId(id){
  return id.length == LITTLEID_LENGTH
}

function encodeQuery(query){
  if(!query) return null
  var ret = {}
  Object.keys(query || {}).forEach(function(key){
    ret[key] = JSON.stringify(query[key])
  })
  return ret
}

module.exports = {
  loadUser:loadUser,
  authUrl:authUrl,
  diggerUrl:diggerUrl,
  storageUrl:storageUrl,
  errorWrapper:errorWrapper,
  jsonRequestWrapper:jsonRequestWrapper,
  jsonResponseWrapper:jsonResponseWrapper,
  littleid:littleid,
  isLittleId:isLittleId,
  encodeQuery:encodeQuery
}