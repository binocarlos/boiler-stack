"use strict";

const Logger = require('../logger')
const logger = Logger('routes')

const Version = require('./version')
const Auth = require('./auth')
const Installations = require('./installation')

const Routes = (base, controllers) => (app) => {
  function bind(method) {
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
  const protect = (req, res, next) => {
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
  get('/installations', protect, installations.list)
  get('/installations/:id', protect, installations.get)
  post('/installations', protect, installations.create)
  put('/installations/:id', protect, installations.save)
  del('/installations/:id', protect, installations.delete)
}

module.exports = Routes