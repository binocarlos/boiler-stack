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

  var storage = ClientStorage({
    
  })

  router.set(opts.url + '/clients/:projectid', {
    GET:auth({
      action:'list'
    }, function(req, res, opts){
      storage.loadProjectClients(opts.params.projectid, jsonResponseWrapper(res))
    }),
    POST:auth({
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        data.projectid = opts.params.projectid
        storage.addModel(data, jsonResponseWrapper(res))
      })
    })
  })

  router.set(opts.url + '/clients/:projectid/:clientid', {
    GET:auth({
      action:'read'
    }, function(req, res, opts){
      storage.loadModel(opts.params.quoteid, jsonResponseWrapper(res))
    }),
    PUT:auth({
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        storage.saveModel(opts.params.quoteid, data, jsonResponseWrapper(res))
      })
    }),
    DELETE:auth({
      action:'delete'
    }, function(req, res, opts){
      storage.deleteModel(opts.params.quoteid, jsonResponseWrapper(res))
    })
  })
}