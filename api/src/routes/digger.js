const diggerFolderUI = require('digger-folder-ui')
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

  console.log('digger mountpoint: ' + opts.url + '/' + paramFields)

  diggerFolderUI({
    // we extract the item id from this part of the path
    idParam:idField,
    mountpoint:opts.url + '/' + paramFields,
    diggerurl:tools.diggerUrl(),
    routeWrapper:auth,
    getParams:getParams,
    router:router
  })
}