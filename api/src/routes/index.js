"use strict";

const Logger = require('../logger')
const logger = Logger('routes')

const Version = require('./version')
const Auth = require('./auth')
const Installations = require('./installations')

function Routes(app, base, model) {
  const queries = model.queries
  const commands = model.commands
  function bind(method) {
    const methodHandler = app[method]
    if(!methodHandler) throw new Error('unknown method: ' + method)
    function handler() {
      var args = Array.prototype.slice.call(arguments)
      const path = args[0] = base + args[0]
      logger({
        'action': 'mount',
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

  const queries = settings.queries
  const commands = settings.commands
  
  const version = Version(settings)
  const auth = Auth({
    queries: queries.user,
    commands: commands.user
  })
  const installations = Installations({
    queries: queries.installations,
    commands: commands.installations
  })

  get('/version', version)
  get('/status', auth.status)
  post('/login', auth.login)
  post('/register', auth.register)
  put('/update', protect, auth.update)
  get('/logout', protect, auth.logout)


}

module.exports = Routes