const tools = require('../tools')


/*

  make sure the user has a 'First Project'
  created so their initial experience is not confusing
  
*/
module.exports = function(router, opts){

  opts = opts || {}

  router.set(opts.url + '/admin/ensure_project', {
    GET:function(req, res){

      res.end('ensure project')
      
    }
  })
}