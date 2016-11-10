const bhttp = require('bhttp')
const hat = require('hat')
const concat = require('concat-stream')
const errorWrapper = require('digger-folder-ui/tools').errorWrapper
const jsonRequestWrapper = require('digger-folder-ui/tools').jsonRequestWrapper
const jsonResponseWrapper = require('digger-folder-ui/tools').jsonResponseWrapper

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