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

  router.set(opts.url + '/clients/:projectid', {
    GET:auth({
      action:'list'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET clients')
      clients.loadProjectClients(opts.params.projectid, jsonResponseWrapper(req.log, res))
    }),
    POST:auth({
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'POST client')
        clients.addProjectClient(opts.params.projectid, data, jsonResponseWrapper(req.log, res))
      })
    })
  })

  router.set(opts.url + '/clients/:projectid/:clientid', {
    GET:auth({
      action:'read'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET client')
      clients.loadModel(opts.params.quoteid, jsonResponseWrapper(req.log, res))
    }),
    PUT:auth({
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'PUT client')
        clients.saveModel(opts.params.quoteid, data, jsonResponseWrapper(req.log, res))
      })
    }),
    DELETE:auth({
      action:'delete'
    }, function(req, res, opts){
      req.log.debug(opts, 'DELETE client')
      clients.deleteModel(opts.params.quoteid, jsonResponseWrapper(req.log, res))
    })
  })
}