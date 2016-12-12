var ProjectStorage = require('../models/projects')
var tools = require('../tools')

var jsonRequestWrapper = tools.jsonRequestWrapper
var jsonResponseWrapper = tools.jsonResponseWrapper
var errorWrapper = tools.jsonErrorResponse

/*

  make sure the user has a 'First Project'
  created so their initial experience is not confusing
  
*/
module.exports = function(router, opts){

  opts = opts || {}
  var auth = opts.auth
  if(!auth) throw new Error('auth required for projects route')

  var projects = ProjectStorage({
    
  })

  router.set(opts.url + '/projects/:accountid', {
    GET:auth({
      action:'list'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET projects')
      projects.loadAccountProjects(opts.params.accountid, jsonResponseWrapper(req.log, res))
    }),
    POST:auth({
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'POST projects')
        projects.addAccountProject(opts.params.accountid, data, jsonResponseWrapper(req.log, res))
      })
    })
  })

  router.set(opts.url + '/projects/:accountid/:projectid', {
    GET:auth({
      action:'read'
    }, function(req, res, opts){
      req.log.debug(opts, 'GET project')
      projects.loadModel(opts.params.projectid, jsonResponseWrapper(req.log, res))
    }),
    PUT:auth({
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        req.log.debug(Object.assign({}, opts, {
          data:data
        }), 'PUT project')
        projects.saveModel(opts.params.projectid, data, jsonResponseWrapper(req.log, res))
      })
    }),
    DELETE:auth({
      action:'delete'
    }, function(req, res, opts){
      req.log.debug(opts, 'DELETE project')
      projects.deleteModel(opts.params.projectid, jsonResponseWrapper(req.log, res))
    })
  })

}