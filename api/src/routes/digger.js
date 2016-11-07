const diggerFolderUI = require('digger-folder-ui')
const diggerFolderUITools = require('digger-folder-ui/tools')
const errorWrapper = diggerFolderUITools.errorWrapper

const tools = require('../tools')

module.exports = function(router, opts){

  opts = opts || {}

  var auth = opts.auth
  var frontendPrefix = opts.frontendPrefix
  var backendPrefix = opts.backendPrefix
  var paramFields = opts.paramFields
  var idField = opts.idField || 'id'

  if(!auth) throw new Error('auth opt needed')
  if(!frontendPrefix) throw new Error('frontendPrefix opt needed')
  if(!backendPrefix) throw new Error('backendPrefix opt needed')
  if(!paramFields) throw new Error('paramFields opt needed')

  // loads the user using the cookie
  //
  // then calls the auth.project handler with:
  //   * project (from url)
  //   * section (from url)
  //   * action (from route)
  //   * params (from url)
  //   * user (from auth service)
  //
  // then writes the user and all props of the wrapper opts
  // to the params for the actual request

  function routeWrapper(wrapperOpts, handler){
    return function(req, res, opts){
      tools.loadUser(req.headers.cookie, errorWrapper(res, function(user){

        var authOpts = Object.assign({}, opts.params, {
          action:wrapperOpts.action,
          user:user
        })

        auth.project(authOpts, errorWrapper(res, function(info){
          opts.params.user = user
          Object.keys(wrapperOpts || {}).forEach(function(key){
            opts.params[key] = wrapperOpts[key]
          })
          handler(req, res, opts)
        }))
      }))
    }
  }

  // extract the values from opts.params based on the route
  // these values are passed in the backend handlers
  function getParams(params){

    var ret = {
      // the item id based on '/:id'
      id:params[idField],

      // construct the backend digger path from the backend prefix and
      // the param fields we are using
      path:[backendPrefix].concat(opts.paramFields.map(function(field){
        return params[field]
      })).join('/')
    }
    return ret
  }

  // turn frontend opts.url = '/v1/api', prefix = 'project', paramFields = ['project', 'section'] into
  // /v1/api/project/:project/:section
  var paramFields = [frontendPrefix].concat(opts.paramFields.map(function(field){
    return ':' + field
  })).join('/')

  console.log('mountpoint: ' + opts.url + '/' + paramFields)

  diggerFolderUI({
    // we extract the item id from this part of the path
    idParam:idField,
    mountpoint:opts.url + '/' + paramFields,
    diggerurl:tools.diggerUrl(),
    routeWrapper:routeWrapper,
    getParams:getParams,
    router:router
  })
}