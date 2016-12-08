var AccountStorage = require('../models/accounts')
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

  var accounts = AccountStorage({
    
  })

  router.set(opts.url + '/accounts', {
    GET:auth({
      action:'list'
    }, function(req, res, opts){
      accounts.loadUserAccounts(opts.user.id, jsonResponseWrapper(res))
    }),
    POST:auth({
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        accounts.addUserAccount(opts.user.id, data, jsonResponseWrapper(res))
      })
    })
  })

  router.set(opts.url + '/accounts/:accountid', {
    GET:auth({
      action:'read'
    }, function(req, res, opts){
      accounts.loadModel(opts.params.accountid, jsonResponseWrapper(res))
    }),
    PUT:auth({
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        accounts.saveModel(opts.params.accountid, data, jsonResponseWrapper(res))
      })
    }),
    DELETE:auth({
      action:'delete'
    }, function(req, res, opts){
      accounts.deleteModel(opts.params.accountid, jsonResponseWrapper(res))
    })
  })

}