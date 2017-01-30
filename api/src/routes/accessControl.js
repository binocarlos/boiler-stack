"use strict";

const urlparse = require('url').parse
const async = require('async')

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
const INSTALLATIONID_QUERY_FIELDS = ['i', 'installation', 'installationid']

const getAccessLevel = (level) => ACCESS_LEVELS[ACCESS_NAMES[level] || 'none']

// authorization rules
const AccessControl = (controllers) => {
  
  const connection = controllers.connection
  const installations = controllers.installation
  const clients = controllers.clients
  
  /*
  
    tools
    
  */
  const hasReqUser = (req) => req.user ? true : false

  const replyNoUser = (next) => next(['user required', 403])
  const replyNoInstallation = (next) => next(['installation id required', 403])
  const replyNoAccess = (next) => next(['insufficient access level', 403])
  const replyError = (err, next) => next([err.toString(), 500])

  const installationPathID = (req) => {
    const id = parseInt(req.params.id)
    return isNaN(id) ? null : id
  }
  const installationQueryID = (req) => {
    const qs = urlparse(req.url, true).query
    let id = INSTALLATIONID_QUERY_FIELDS
      .map(f => qs[f])
      .filter(v => v)[0]
    id =  parseInt(id)
    return isNaN(id) ? null : id
  }

  /*
  
    database queries
    
  */
  const installationAccess = (opts, done) => {
    const requiredAccess = opts.accessLevel
    installations.accessLevel(connection(opts.req.id, opts.accountid), {
      accountid: opts.accountid,
      installationid: opts.installationid
    }, (err, userAccess) => {
      if(err) return replyError(err, done)
      if(getAccessLevel(userAccess) < getAccessLevel(requiredAccess)) return replyNoAccess(done)
      opts.req.installationid = opts.installationid
      opts.req.installationAccess = userAccess
      done()
    })
  }

  const hasInstallationClient = (opts, done) => {
    clients.hasInstallation(connection(opts.req.id, opts.accountid), {
      clientid: opts.clientid,
      installationid: opts.installationid
    }, done)
  }

  /*
  
    access control handlers
    
  */

  // a logged in user is required
  const user = (opts) => (req, res, next) => {
    if(!hasReqUser(req)) return replyNoUser(next)
    next()
  }

  const installation = (accessLevel, extractor) => {
    return (req, res, next) => {
      if(!hasReqUser(req)) return replyNoUser(next)
      const installationid = extractor(req)
      if(!installationid) return replyNoInstallation(next)
      installationAccess({
        req: req,
        accountid: req.user.id,
        installationid,
        accessLevel
      }, next)
    }
  }

  const pathInstallation = (accessLevel) => installation(accessLevel, installationPathID)
  const queryInstallation = (accessLevel) => installation(accessLevel, installationQueryID)


  // checking the client means:
  //
  //  * check for access level to the installation
  //  * check the client lives in the installation
  const client = (accessLevel, extractor) => {
    const installationChecker = queryInstallation(accessLevel)
    extractor = extractor || installationQueryID
    return (req, res, next) => {
      if(!hasReqUser(req)) return replyNoUser(next)
      const installationid = extractor(req)
      if(!installationid) return replyNoInstallation(next)

      // first check the users access to the installation itself
      installationChecker(req, res, (err) => {
        if(err) return replyError(err, done)

        // now check that the given user lives in that installation
        hasInstallationClient({
          req: req,
          accountid: req.user.id,
          installationid
        }, (err, hasClient) => {
          if(err) return replyError(err, done)
          if(!hasClient) return replyNoAccess(done)
          done()
        })
      })
    }
  }

  return {
    user,
    pathInstallation,
    queryInstallation,
    client
  }
}

module.exports = AccessControl