const tools = require('../tools')

module.exports = function(router, opts){

  opts = opts || {}

  router.set(opts.url + '/user', {
    GET:function(req, res){

      tools.loadUser(req.headers.cookie, errorWrapper(res, function(user){
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(user))
      }))
      
    }
  })
}