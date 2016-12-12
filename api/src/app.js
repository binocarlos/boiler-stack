var url = require('url')

var HttpHashRouter = require('http-hash-router')
var Logger = require('./logger')
var Auth = require('./auth')

var Digger = require('./routes/digger')
var Version = require('./routes/version')
var Users = require('./routes/users')
var Installations = require('./routes/installations')
var Projects = require('./routes/projects')
var Quotes = require('./routes/quotes')
var Clients = require('./routes/clients')

module.exports = function(opts){

  opts = opts || {}

  if(!opts.url) logger.error(new Error('routes needs a url option'))

  var router = HttpHashRouter()

  // the auth function that is passed the context from above
  var auth = Auth(opts)

  var routeOpts = Object.assign({}, opts, {
    auth:auth
  })

  // this setps up the 
  // /api/v1/digger/:project/:section -> (/api/v1/digger/apples/oranges)
  // /project/:project/:section-> (/project/apples/oranges)
  Digger(router, Object.assign({}, opts, {
    auth:auth('digger'),
    // the frontend route prefix
    frontendPrefix:'digger',
    // the backend digger prefix
    backendPrefix:'account',
    // the array of params to map from the route
    paramFields:['account', 'section']
  }))

  Version(router)

  Users(router, Object.assign({}, opts, {
    auth:auth('users')
  }))

  Installations(router, Object.assign({}, opts, {
    auth:auth('installations')
  }))

  Projects(router, Object.assign({}, opts, {
    auth:auth('projects')
  }))

  Quotes(router, Object.assign({}, opts, {
    auth:auth('quotes')
  }))

  Clients(router, Object.assign({}, opts, {
    auth:auth('clients')
  }))

  var logger = Logger({
    name:'api'
  })

  function handler(req, res) {
    logger(req, res)
    
    function onError(err) {
      if (err) {
        req.log.error({}, err)
        res.statusCode = err.statusCode || 500;
        res.end(err.message);
      }
    }
    router(req, res, {}, onError)
  }

  return handler
}