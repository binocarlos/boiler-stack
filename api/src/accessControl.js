"use strict";

const ACCESS_LEVELS = {
  write: 20,
  read: 10,
  none: 0
}

const ACCESS_NAMES = {
  owner: 'write',
  editor: 'write',
  viewer: 'read'
}

const DEFAULT_ACCESS_LEVEL = 'viewer'

const getAccessLevel = (level) => ACCESS_LEVELS[ACCESS_NAMES[level] || 'none']

// authorization rules
const AccessControl = (controllers) => {
  
  const connection = controllers.connection
  const installationAccessLevel = controllers.installation.accessLevel
  
  const user = (opts) => (req, res, next) => {
    if(!req.user) return next(['user required', 403])
    next()
  }

  const installation = (opts) => {
    opts = opts || {}
    if(typeof(opts) == 'string') opts = {
      accessLevel: opts
    }
    if(!opts.extractor) throw new Error('extractor required')
    const extractor = opts.extractor
    const requiredAccess = opts.accessLevel || DEFAULT_ACCESS_LEVEL
    return (req, res, next) => {
      if(!req.user) return next(['user required', 403])
      const accountid = req.user.id
      const installationid = extractor(req)
      if(!installationid) return next(['installation id required', 403])
      installationAccessLevel(connection(req.id, accountid), {
        accountid,
        installationid
      }, (err, userAccess) => {
        if(err) return next([err.toString(), 500])
        if(getAccessLevel(userAccess) < getAccessLevel(requiredAccess)) {
          return next(['insufficient access level', 403])
        }
        next()
      })
    }
  }

  return {
    user,
    installation
  }
}

module.exports = AccessControl