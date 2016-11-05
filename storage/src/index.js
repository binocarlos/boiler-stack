var http = require('http')
var tools = require('./tools')
var App = require('./app')

var args = require('minimist')(process.argv, {
  alias:{
    p:'port',
    m:'mongohost',
    p:'mongoport',
    d:'mongodatabase'
  },
  default:{
    port:process.env.PORT || 80,
    mongohost:process.env.MONGO_SERVICE_HOST || 'mongo',
    mongoport:process.env.MONGO_SERVICE_PORT || 27017,
    mongodatabase:process.env.MONGO_SERVICE_DATABASE || 'storage'
  }
})

var app = App(args)

var httpserver = http.createServer(app)
httpserver.listen(args.port, function(){
  console.log('server listening on port ' + args.port)
})