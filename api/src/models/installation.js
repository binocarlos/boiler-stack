"use strict";
const async = require('async')
const SQL = require('../database/sql')
const selectors = require('../database/selectors')

const prepareData = (installation) => {
  const meta = installation.meta || {}
  return Object.assign({}, installation, {
    meta: JSON.stringify(meta)
  })
}

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

  get: (params) => SQL.select('installation', params),
  save: (data, params) => SQL.update('installation', data, params),
  delete: (params) => SQL.delete('installation', params),
  insert: (data) => SQL.insert('installation', data),
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

const get = (runQuery, params, done) => runQuery(QUERIES.get(params), selectors.single(done))

//  * userid
const byUser = (runQuery, query, done) => runQuery(QUERIES.byUser(query.userid), selectors.rows(done))

//  * data
//    * name
//    * meta
//  * userid
const create = (runQuery, query, done) => {
  const userid = query.userid
  const data = prepareData(query.data)
  let newObjects = {
    installation: null,
    collaboration: null
  }
  
  async.waterfall([

    (next) => runQuery(QUERIES.insert(data), selectors.single(next)),
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
    done(null, newObjects.installation)
  })
}

//  * params
//  * data
//    * name
//    * meta
const save = (runQuery, query, done) => {
  const data = prepareData(query.data)
  const params = query.params
  runQuery(QUERIES.save(data, params), selectors.single(done))
}

//  * id
const del = (runQuery, query, done) => {
  runQuery(QUERIES.delete(query), selectors.single(done))
}

module.exports = {
  QUERIES,
  get: get,
  byUser,
  create,
  save,
  delete: del
}