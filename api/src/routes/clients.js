const ClientStorage = require('../models/clients')
const tools = require('../tools')
const jsonRequestWrapper = tools.jsonRequestWrapper
const jsonResponseWrapper = tools.jsonResponseWrapper
const errorWrapper = tools.jsonErrorResponse

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
      clients.loadProjectClients(opts.params.projectid, jsonResponseWrapper(res))
    }),
    POST:auth({
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        clients.addProjectClient(opts.params.projectid, data, jsonResponseWrapper(res))
      })
    })
  })

  router.set(opts.url + '/clients/:projectid/:clientid', {
    GET:auth({
      action:'read'
    }, function(req, res, opts){
      clients.loadModel(opts.params.quoteid, jsonResponseWrapper(res))
    }),
    PUT:auth({
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        clients.saveModel(opts.params.quoteid, data, jsonResponseWrapper(res))
      })
    }),
    DELETE:auth({
      action:'delete'
    }, function(req, res, opts){
      clients.deleteModel(opts.params.quoteid, jsonResponseWrapper(res))
    })
  })
}