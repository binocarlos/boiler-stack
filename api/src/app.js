const url = require('url')
const morgan = require('morgan')
const HttpHashRouter = require('http-hash-router')

const logger = morgan('combined')

const Auth = require('./auth')

const Digger = require('./routes/digger')
const Version = require('./routes/version')
const Users = require('./routes/users')
const Installations = require('./routes/installations')
const Projects = require('./routes/projects')
const Quotes = require('./routes/quotes')
const Clients = require('./routes/clients')

module.exports = function(opts){

  opts = opts || {}

  if(!opts.url) throw new Error('routes needs a url option')

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

  function handler(req, res) {

    function onError(err) {
      if (err) {
        res.statusCode = err.statusCode || 500;
        res.end(err.message);
      }
    }

    logger(req, res, function (err) {
      if(err) return onError(err)
      router(req, res, {}, onError)
    })
  }

  return handler
}