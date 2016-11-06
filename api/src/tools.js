var bhttp = require("bhttp")

function authUrl(path){
  var url = 'http://' + process.env.AUTH_SERVICE_HOST + ':' + process.env.AUTH_SERVICE_PORT
  return path ? url + path : url
}

function diggerUrl(path){
  var url = 'http://' + process.env.DIGGER_SERVICE_HOST + ':' + process.env.DIGGER_SERVICE_PORT
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

module.exports = {
  loadUser:loadUser,
  authUrl:authUrl,
  diggerUrl:diggerUrl
}