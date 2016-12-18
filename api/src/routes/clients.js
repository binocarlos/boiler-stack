var ClientStorage = require('../models/clients')
var tools = require('../tools')
var jsonRequestWrapper = tools.jsonRequestWrapper
var jsonResponseWrapper = tools.jsonResponseWrapper
var errorWrapper = tools.jsonErrorResponse

/*

  quotes
  
*/
module.exports = function(router, opts){

  opts = opts || {}
  var auth = opts.auth
  if(!auth) throw new Error('auth required for clients route')

  var clients = ClientStorage({
    
  })

  router.set(opts.url + '/clients/:installationid', {
    GET:auth({
      action:'list'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET clients')
      clients.loadInstallationClients(opts.params.installationid, req.log, jsonResponseWrapper(req.log, res))
    }),
    POST:auth({
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'POST client')
        clients.addInstallationClient(opts.params.installationid, data, req.log, jsonResponseWrapper(req.log, res))
      })
    })
  })

  router.set(opts.url + '/clients/:installationid/:clientid', {
    GET:auth({
      action:'read'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET client')
      clients.loadModel(opts.params.clientid, req.log, jsonResponseWrapper(req.log, res))
    }),
    PUT:auth({
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'PUT client')
        clients.saveModel(opts.params.clientid, data, req.log, jsonResponseWrapper(req.log, res))
      })
    }),
    DELETE:auth({
      action:'delete'
    }, function(req, res, opts){
      req.log.debug(opts, 'DELETE client')
      clients.deleteModel(opts.params.clientid, req.log, jsonResponseWrapper(req.log, res))
    })
  })
}