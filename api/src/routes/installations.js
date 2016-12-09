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
      installations.loadUserInstallations(opts.user.id, jsonResponseWrapper(res))
    }),
    POST:auth({
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        installations.addUserInstallation(opts.user.id, data, jsonResponseWrapper(res))
      })
    })
  })

  router.set(opts.url + '/installations/:installationid', {
    GET:auth({
      action:'read'
    }, function(req, res, opts){
      installations.loadModel(opts.params.installationid, jsonResponseWrapper(res))
    }),
    PUT:auth({
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        installations.saveModel(opts.params.installationid, data, jsonResponseWrapper(res))
      })
    }),
    DELETE:auth({
      action:'delete'
    }, function(req, res, opts){
      installations.deleteModel(opts.params.installationid, jsonResponseWrapper(res))
    })
  })

}