"use strict";
const async = require('async')
const Crud = require('../database/crud')
const SQL = require('../database/sql')
const selectors = require('../database/selectors')

const QUERIES = {
  byUser: (userid) => {
    const params = [userid]
    const sql = `select *
from
  installation
join
  collaboration
on
  (collaboration.installation = installation.id)
where
  collaboration.useraccount = $1
order by
  installation.name
`
    return {
      sql,
      params
    }
  },

  insertInstallation: (data) => {
    return SQL.insert('installation', data)
  },

  insertCollaboration: (userid, permission) => {
    permission = permission || 'owner'
    return SQL.insert('collaboration', {
      'useraccount': userid,
      'installation': 'lastval()',
      'permission': permission
    }, {
      'installation': 'raw'
    })
  }
}

const byUser = (runQuery, userid, done) => runQuery(QUERIES.byUser(userid), selectors.rows(done))

// models.installation.create - create an installation for a user a an owner
// 1. insert the installation
// 2. insert the collaboration
// query:
//  * data
//  * userid
const create = (runQuery, query, done) => {
  const userid = query.userid
  const data = query.data
  let newObjects = {
    installation: null,
    collaboration: null
  }
  
  async.waterfall([

    (next) => runQuery(QUERIES.insertInstallation(data), selectors.single(next)),
    (installation, next) => {
      newObjects.installation = installation
      runQuery(QUERIES.insertCollaboration(userid), selectors.single(next))
    },
    (collaboration, next) => {
      newObjects.collaboration = collaboration
      next()
    }

  ], (err) => {
    if(err) return done(err)
    done(null, newObjects)
  })
}

module.exports = {
  byUser,
  create,
  QUERIES
}