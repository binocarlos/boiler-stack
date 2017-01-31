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
  const clients = controllers.client
  const utils = controllers.utils
  
  /*
  
    general tools
    
  */
  const hasReqUser = (req) => req.user ? true : false

  const replyNoUser = (next) => next(['user required', 403])
  const replyNoParam = (name, next) => next([name + ' required', 403])
  const replyNoAccess = (next) => next(['insufficient access level', 403])
  const replyError = (err, next) => next([err.toString(), 500])

  // extract a numeric named path parameter from the route (e.g. /:id)
  const pathParam = (name) => (req) => {
    const val = parseInt(req.params[name])
    return isNaN(val) ? null : val
  }

  // extract a numeric id from an array of query-strings
  // first result matches
  const queryParam = (names) => (req) => {
    const qs = urlparse(req.url, true).query
    let id = names
      .map(f => qs[f])
      .filter(v => v)[0]
    id =  parseInt(id)
    return isNaN(id) ? null : id
  }

  const getRequiredAccess = (access) => access || 'viewer'
  const getIdParam = pathParam('id')

  const installationExtractors = {
    'path': pathParam('id'),
    'query': queryParam(INSTALLATIONID_QUERY_FIELDS)
  }

  const getInstallationExtractor = (extractor) => {
    if(!extractor) extractor = 'query'
    if(typeof(extractor) == 'string') extractor = installationExtractors[extractor]
    return extractor
  }


  /*
  
    user
    
  */

  // a logged in user is required
  const user = (opts) => (req, res, next) => {
    if(!hasReqUser(req)) return replyNoUser(next)
    next()
  }

  /*
  
    installation
    
  */
  
  const installation = (requiredAccess, extractor) => {
    requiredAccess = getRequiredAccess(requiredAccess)
    extractor = getInstallationExtractor(extractor)
    return (req, res, next) => {

      if(!hasReqUser(req)) return replyNoUser(next)
      const installationid = extractor(req)
      if(!installationid) return replyNoParam('installation id', next)

      installations.accessLevel(connection(req.id, req.user.id), {
        params: {
          accountid: req.user.id,
          installationid
        }
      }, (err, userAccess) => {

        if(err) return replyError(err, next)

        // access level assertion
        if(getAccessLevel(userAccess) < getAccessLevel(requiredAccess)) return replyNoAccess(next)

        // write the installation access levels to the req for the route to consume
        req.installationid = installationid
        req.installationAccess = userAccess

        next()
      })
    }
  }

  /*
  
    client
    
  */

  // checking the client means:
  //
  //  * check for access level to the installation
  //  * check the client lives in the installation
  const client = (requiredAccess) => {

    const installationChecker = installation(requiredAccess)

    return (req, res, next) => {

      const clientid = getIdParam(req)
      if(!clientid) return replyNoParam('clientid', next)

      // first check the users access to the installation itself
      installationChecker(req, res, (err) => {

        // return the plain error because the installation checker has already processed it
        if(err) return next(err)

        // now check that the given client lives in that installation
        clients.hasInstallation(connection(req.id, req.user.id), {
          params: {
            clientid: clientid,
            installationid: req.installationid
          }
        }, (err, hasClient) => {
          if(err) return replyError(err, next)
          if(!hasClient) return replyNoAccess(next)
          next()
        })

      })
    }
  }

  /*
  
    installation_link
    
  */

  // checking the installation_link means:
  //
  //  * check for access level to the installation
  //  * check the table -> id has an installation set to the current installation
  const installation_link = (table, requiredAccess) => {

    const installationChecker = installation(requiredAccess)

    return (req, res, next) => {

      const id = getIdParam(req)
      if(!id) return replyNoParam('entityId', next)

      // first check the users access to the installation itself
      installationChecker(req, res, (err) => {

        // return the plain error because the installation checker has already processed it
        if(err) return next(err)

        utils.entityInstallationId(connection(req.id, req.user.id), {
          params: {
            table,
            id
          }
        }, (err, installationid) => {
          if(err) return replyError(err, next)

          // if the entity is of a different installation then deny
          if(installationid != req.installationid) replyNoAccess(next)
          next()
        })

      })
    }
  }

  return {
    user,
    installation,
    installation_link,
    client
  }
}

module.exports = AccessControl