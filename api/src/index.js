var http = require('http')
var fs = require('fs')
var Routes = require('./routes')

var args = require('minimist')(process.argv, {
  alias:{
    p:'port',
    u:'url'
  },
  default:{
    port:process.env.PORT || 80,
    url:process.env.URL || '/v1/api'
  }
})

var routes = Routes(args)

var httpserver = http.createServer(routes)
httpserver.listen(args.port, function(){
  console.log('server listening on port ' + args.port)
})