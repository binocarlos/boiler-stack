"use strict";

const urlparse = require('url').parse
const Logger = require('../logger')
const logger = Logger('routes')

const AccessControl = require('../accessControl')

const Version = require('./version')
const Auth = require('./auth')
const Installations = require('./installation')

const reqQuery = (req) => urlparse(req.url, true)
const reqParam = (req, name) => reqQuery(req)[name]

const Routes = (base, controllers) => (app) => {
  const access = AccessControl(controllers)
  const bind = (method) => {
    const methodHandler = app[method]
    if(!methodHandler) throw new Error('unknown method: ' + method)
    function handler() {
      var args = Array.prototype.slice.call(arguments)
      const path = args[0] = base + args[0]
      logger.debug('mount', 'system', {
        'route': method + ' ' + path
      })
      methodHandler.apply(app, args)
    }
    return handler
  }
  const protect = (opts) => (req, res, next) => {
    if(!req.user) return next(['user required', 403])
    next()
  }
  const get = bind('get')
  const post = bind('post')
  const put = bind('put')
  const del = bind('delete')

  const version = Version()
  const auth = Auth(controllers)
  const installations = Installations(controllers)

  // utils
  get('/version', version)

  // auth
  get('/status', auth.status)
  post('/login', auth.login)
  post('/register', auth.register)
  put('/update', protect, auth.update)
  get('/logout', auth.logout)

  // installation
  const installationAccess = (accessLevel) => access.installation({
    getId: req => req.params.id,
    accessLevel
  })

  // auth handled by the collaboration links
  get('/installations', access.user(), installations.list)
  post('/installations', access.user(), installations.create)

  // need to check access levels for these routes
  get('/installations/:id', installationAccess(), installations.get)
  put('/installations/:id', installationAccess('editor'), installations.save)
  del('/installations/:id', installationAccess('editor'), installations.delete)

  // thie is read-only because we are updating their user record
  put('/installations/:id/activate', installationAccess(), installations.activate)
}

module.exports = Routes