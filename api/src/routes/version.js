const tools = require('../tools')

module.exports = function(router, opts){

  opts = opts || {}

  router.set(opts.url + '/version', {
    GET:function(req, res){
      res.end(VERSION)
    }
  })

}