var path = require('path')
var tools = require('../tools')
var VERSION = require(path.join(__dirname, '..', '..', 'package.json')).version

module.exports = function(router, opts){

  opts = opts || {}

  router.set(opts.url + '/version', {
    GET:function(req, res){
      res.end(VERSION)
    }
  })

}