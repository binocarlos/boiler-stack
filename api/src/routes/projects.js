const ProjectStorage = require('../models/projects')
const tools = require('../tools')
const jsonRequestWrapper = tools.jsonRequestWrapper
const jsonResponseWrapper = tools.jsonResponseWrapper
const errorWrapper = tools.jsonErrorResponse

/*

  make sure the user has a 'First Project'
  created so their initial experience is not confusing
  
*/
module.exports = function(router, opts){

  opts = opts || {}
  var auth = opts.auth
  if(!auth) throw new Error('auth required for projects route')

  var storage = ProjectStorage({
    
  })

  router.set(opts.url + '/projects', {
    GET:auth({
      action:'list'
    }, function(req, res, opts){
      storage.loadUserProjects(opts.user.id, jsonResponseWrapper(res))
    }),
    POST:auth({
      action:'add'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        storage.addUserProject(opts.user.id, data, jsonResponseWrapper(res))
      })
    })
  })

  router.set(opts.url + '/projects/:projectid', {
    GET:auth({
      action:'read'
    }, function(req, res, opts){
      storage.loadModel(opts.params.projectid, jsonResponseWrapper(res))
    }),
    PUT:auth({
      action:'save'
    }, function(req, res, opts){
      jsonRequestWrapper(req, res, function(data){
        storage.saveModel(opts.params.projectid, data, jsonResponseWrapper(res))
      })
    }),
    DELETE:auth({
      action:'delete'
    }, function(req, res, opts){
      storage.deleteModel(opts.params.projectid, jsonResponseWrapper(res))
    })
  })

}