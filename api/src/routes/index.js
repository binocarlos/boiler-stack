"use strict";

const urlparse = require('url').parse
const Logger = require('../logger')
const logger = Logger('routes')

const AccessControl = require('./accessControl')
const Version = require('./version')
const Auth = require('./auth')
const Installations = require('./installation')
const Clients = require('./client')
const Resources = require('./resource')

const Routes = (base, controllers) => (app) => {
  
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

  const access = AccessControl(controllers)

  const get = bind('get')
  const post = bind('post')
  const put = bind('put')
  const del = bind('delete')

  const version = Version()
  const auth = Auth(controllers)
  const installations = Installations(controllers)
  const clients = Clients(controllers)
  const resources = Resources(controllers)

  // utils
  get('/version', version)

  // auth
  get('/status', auth.status)
  post('/login', auth.login)
  post('/register', auth.register)
  put('/update', access.user(), auth.update)
  get('/logout', auth.logout)

  // installation

  // auth handled by the collaboration links
  get('/installations', access.user(), installations.list)
  post('/installations', access.user(), installations.create)

  // need to check access levels for these routes
  get('/installations/:id', access.installation('viewer', 'path'), installations.get)
  put('/installations/:id', access.installation('editor', 'path'), installations.save)
  del('/installations/:id', access.installation('editor', 'path'), installations.delete)

  // thie is read-only because we are updating their user record
  put('/installations/:id/activate', access.installation('viewer', 'path'), installations.activate)

  // client
  get('/clients', access.installation(), clients.list)
  get('/clients/new', access.user(), clients.newdata)
  post('/clients', access.installation('editor'), clients.create)
  get('/clients/:id', access.client(), clients.get)
  put('/clients/:id', access.client('editor'), clients.save)
  del('/clients/:id', access.client('editor'), clients.delete)

  // resource
  get('/resources', access.installation(), resources.list)
  post('/resources', access.installation('editor'), resources.create)
  post('/resources/:id', access.installation_link('resource', 'editor'), resources.create)
  get('/resources/:id', access.installation_link('resource'), resources.get)
  put('/resources/:id', access.installation_link('resource', 'editor'), resources.save)
  del('/resources/:id', access.installation_link('resource', 'editor'), resources.delete)
}

module.exports = Routes