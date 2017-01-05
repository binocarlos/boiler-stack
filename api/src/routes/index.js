"use strict";

const Logger = require('../logger')
const logger = Logger('routes')

const Version = require('./version')
const Auth = require('./auth')

function Routes(app, settings) {
  const base = settings.base
  const bind = (method, path, handler) => {
    path = base + path
    logger({
      'action': 'mount',
      'route': method + ' ' + path
    })
    app[method](path, handler)
  }
  const version = Version(settings)
  const auth = Auth(settings)
  bind('get', '/version', version)
  bind('get', '/status', auth.status)
  bind('post', '/login', auth.login)
  bind('post', '/register', auth.register)
  bind('get', '/logout', auth.logout)
}

module.exports = Routes