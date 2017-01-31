"use strict";

/*

  extract userid and installationid params into the req

  this makes it easy for auth assertions and logging to know
  the user and installation
  
*/

const urlparse = require('url').parse
const INSTALLATIONID_QUERY_FIELDS = ['i', 'installation', 'installationid']

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

const installationQuery = queryParam(INSTALLATIONID_QUERY_FIELDS)

const ParamMiddleware = (opts) => (req, res, next) => {
  req.userid = req.user ? req.user.id : null
  req.installationid = installationQuery(req)
  next()
}

module.exports = ParamMiddleware