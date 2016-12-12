var QuoteStorage = require('../models/quotes')
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
  if(!auth) throw new Error('auth required for quotes route')

  var quotes = QuoteStorage({
    
  })

  router.set(opts.url + '/quotes/:projectid', {
    GET:auth({
      action:'list'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET quotes')
      quotes.loadProjectQuotes(opts.params.projectid, jsonResponseWrapper(req.log, res))
    }),
    POST:auth({
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'POST quotes')
        quotes.addProjectQuote(opts.params.projectid, data, jsonResponseWrapper(req.log, res))
      })
    })
  })

  router.set(opts.url + '/quotes/:projectid/:quoteid', {
    GET:auth({
      action:'read'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET quote')
      quotes.loadModel(opts.params.quoteid, jsonResponseWrapper(req.log, res))
    }),
    PUT:auth({
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'PUT quote')
        quotes.saveModel(opts.params.quoteid, data, jsonResponseWrapper(req.log, res))
      })
    }),
    DELETE:auth({
      action:'delete'
    }, function(req, res, opts){
      req.log.debug(opts, 'DELETE quote')
      quotes.deleteModel(opts.params.quoteid, jsonResponseWrapper(req.log, res))
    })
  })
}