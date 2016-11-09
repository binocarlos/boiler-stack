const UserStorage = require('../models/users')
const tools = require('../tools')
const jsonRequestWrapper = tools.jsonRequestWrapper
const jsonResponseWrapper = tools.jsonResponseWrapper
const errorWrapper = tools.jsonErrorResponse

module.exports = function(router, opts){

  opts = opts || {}
  var auth = opts.auth
  if(!auth) throw new Error('auth required for users route')

  var storage = UserStorage({
    
  })

  /*
  
    load the current logged in user
    
  */
  router.set(opts.url + '/currentuser', {
    GET:function(req, res){
      tools.loadUser(req.headers.cookie, jsonResponseWrapper(res))
    }
  })

  router.set(opts.url + '/users', {
    GET:auth({
      action:'list'
    }, function(req, res, opts){
      storage.loadModels({

      }, jsonResponseWrapper(res))
    }),
    POST:auth({
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        storage.addModel(data, jsonResponseWrapper(res))
      })
    })
  })

  router.set(opts.url + '/users/:userid', {
    GET:auth({
      action:'read'
    }, function(req, res, opts){
      storage.loadModel(opts.params.userid, jsonResponseWrapper(res))
    }),
    PUT:auth({
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        storage.saveModel(opts.params.userid, data, jsonResponseWrapper(res))
      })
    }),
    DELETE:auth({
      action:'delete'
    }, function(req, res, opts){
      storage.deleteModel(opts.params.userid, jsonResponseWrapper(res))
    })
  })
}