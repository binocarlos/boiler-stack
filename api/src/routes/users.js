var UserStorage = require('../models/users')
var tools = require('../tools')
var jsonRequestWrapper = tools.jsonRequestWrapper
var jsonResponseWrapper = tools.jsonResponseWrapper
var errorWrapper = tools.jsonErrorResponse

module.exports = function(router, opts){

  opts = opts || {}
  var auth = opts.auth
  if(!auth) throw new Error('auth required for users route')

  var users = UserStorage({
    
  })

  /*
  
    load the current logged in user
    
  */
  router.set(opts.url + '/currentuser', {
    GET:auth({
      action:'currentuser'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET currentuser')
      tools.loadUser(req.log, req.headers.cookie, jsonResponseWrapper(req.log, res))
    }),
    PUT:auth({
      action:'savecurrentuser'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'PUT currentuser')
        users.saveModel(opts.user.id, data, req.log, jsonResponseWrapper(req.log, res))
      })
    })
  })

  router.set(opts.url + '/users', {
    GET:auth({
      superadmin:true,
      action:'list'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET users')
      users.loadModels({

      }, req.log, jsonResponseWrapper(req.log, res))
    }),
    POST:auth({
      superadmin:true,
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'POST users')
        users.addModel(data, req.log, jsonResponseWrapper(req.log, res))
      })
    })
  })

  router.set(opts.url + '/users/:userid', {
    GET:auth({
      superadmin:true,
      action:'read'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET user')
      users.loadModel(opts.params.userid, req.log, jsonResponseWrapper(req.log, res))
    }),
    PUT:auth({
      superadmin:true,
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'PUT user')
        users.saveModel(opts.params.userid, data, req.log, jsonResponseWrapper(req.log, res))
      })
    }),
    DELETE:auth({
      superadmin:true,
      action:'delete'
    }, function(req, res, opts){
      req.log.debug(opts, 'DELETE user')
      users.deleteModel(opts.params.userid, req.log, jsonResponseWrapper(req.log, res))
    })
  })
}