var bhttp = require("bhttp")

module.exports = {
  loadUser:function(cookie, done){
    var url = 'http://' + process.env.AUTH_SERVICE_HOST + ':' + process.env.AUTH_SERVICE_PORT + '/v1/auth/status'

    bhttp.get(url, {
      decodeJSON:true,
      headers:{
        cookie:cookie
      }
    }, function(err, authResp){
      if(err) return done(err)
      done(null, authResp.body)
    })
  }
}