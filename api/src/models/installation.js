"use strict";
const async = require('async')
const Transaction = require('../database/transaction')
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

  insertCollaboration: (userid) => {
    return SQL.insert('collaboration', {
      'useraccount': userid,
      'installation': 'lastval()'
    }, {
      'installation': 'raw'
    })
  }
}

const byUser = (runQuery) => (userid, done) => {
  connection((client, finish) => {
    const query = QUERIES.byUser(userid)
    runQuery(query.sql, query.params, selectors.rows(finish))
  }, done)
}

// models.installation.create - create an installation for a user a an owner
// 1. insert the installation
// 2. insert the collaboration
const create = (runQuery) => (data, userid, done) => {
  let newObjects = {
    installation: null,
    collaboration: null
  }
  
  async.waterfall([

    (next) => runQuery(QUERIES.insertInstallation(data), next),
    (installation, next) => {
      newObjects.installation = installation
      runQuery(QUERIES.insertCollaboration(userid), next)
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