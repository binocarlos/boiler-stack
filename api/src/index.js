var http = require('http')
var fs = require('fs')
var App = require('./app')

var args = require('minimist')(process.argv, {
  alias:{
    p:'port',
    u:'url'
  },
  default:{
    port:process.env.PORT || 80,
    url:process.env.URL || '/api/v1'
  }
})

var routes = App(args)

var httpserver = http.createServer(routes)
httpserver.listen(args.port)