var InstallationStorage = require('../models/installations')
var tools = require('../tools')
var jsonRequestWrapper = tools.jsonRequestWrapper
var jsonResponseWrapper = tools.jsonResponseWrapper
var errorWrapper = tools.jsonErrorResponse

/*

  make sure the user has an account created that they own
  
*/
module.exports = function(router, opts){

  opts = opts || {}
  var auth = opts.auth
  if(!auth) throw new Error('auth required for accounts route')

  var installations = InstallationStorage({
    
  })

  router.set(opts.url + '/installations', {
    GET:auth({
      action:'list'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET installations')
      installations.loadUserInstallations(opts.user.id, req.log, jsonResponseWrapper(req.log, res))
    }),
    POST:auth({
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){ 
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'POST installations')
        installations.addUserInstallation(opts.user.id, data, req.log, jsonResponseWrapper(req.log, res))
      })
    })
  })

  router.set(opts.url + '/installations/:installationid', {
    GET:auth({
      action:'read'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET installation')
      installations.loadModel(opts.params.installationid, req.log, jsonResponseWrapper(req.log, res))
    }),
    PUT:auth({
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'PUT installation')
        installations.saveModel(opts.params.installationid, data, req.log, jsonResponseWrapper(req.log, res))
      })
    }),
    DELETE:auth({
      action:'delete'
    }, function(req, res, opts){
      req.log.debug(opts, 'DELETE installation')
      installations.deleteInstallation(opts.params.installationid, req.log, jsonResponseWrapper(req.log, res))
    })
  })

}