"use strict";
const async = require('async')
const SQL = require('../database/sql')
const selectors = require('../database/selectors')

const prepareData = (installation) => {
  return installation.meta ?
    Object.assign({}, installation, {
      meta: JSON.stringify(installation.meta)
    }) :
    installation
}

const defaultInstallation = (accountid) => {
  return {
    data: {
      name: 'My First Company',
      meta: {}
    },
    accountid: accountid
  }
}

const QUERIES = {

  byUser: (accountid) => {
    const params = [accountid]
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
  getCollaboration: (params) => SQL.select('collaboration', params),
  insertCollaboration: (accountid, permission) => {
    permission = permission || 'owner'
    return SQL.insert('collaboration', {
      'useraccount': accountid,
      'installation': 'lastval()',
      'permission': permission
    }, {
      'installation': 'raw'
    })
  }
}

const get = (runQuery, params, done) => runQuery(QUERIES.get(params), selectors.single(done))

const accessLevel = (runQuery, params, done) => {
  runQuery(QUERIES.getCollaboration({
    useraccount: params.accountid,
    installation: params.installationid
  }), selectors.field('permission', done))
}

//  * accountid
const byUser = (runQuery, query, done) => runQuery(QUERIES.byUser(query.accountid), selectors.rows(done))

//  * data
//    * name
//    * meta
//  * accountid
const create = (runQuery, query, done) => {
  const accountid = query.accountid

  let data = query.data == 'default' ?
    defaultInstallation(accountid) :
    query.data

  data = prepareData(data)
  let newObjects = {
    installation: null,
    collaboration: null
  }
  
  async.waterfall([

    (next) => runQuery(QUERIES.insert(data), selectors.single(next)),
    (installation, next) => {
      newObjects.installation = installation
      runQuery(QUERIES.insertCollaboration(accountid), selectors.single(next))
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
  accessLevel,
  create,
  save,
  delete: del
}