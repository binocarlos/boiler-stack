"use strict";
const async = require('async')
const SQL = require('../database/sql')
const selectors = require('../database/selectors')

const UserModel = require('./user')

/*

  a client is a useraccount with a 'client' collaboration
  on the installation

  they have 'job_access' to control what the client can see
  in the installatiom
  
*/

const QUERIES = {

  list: (installationid) => {
    const sql = `select useraccount.*
from
  useraccount
join
  collaboration
on
(
  collaboration.useraccount = useraccount.id
)
where
(
  collaboration.installation = $1
  and
  collaboration.permission = 'client'
)
order by
  useraccount.email
`

    const params = [installationid]

    return {
      sql,
      params
    }
  },
  insertCollaboration: (accountid, installationid) => {
    return SQL.insert('collaboration', {
      'useraccount': accountid,
      'installation': installationid,
      'permission': 'client'
    })
  }
}

const get = (runQuery, params, done) => runQuery(SQL.select('useraccount', params), selectors.single(done, UserModel.clean))

//  * installationid
const list = (runQuery, params, done) => {
  console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.dir(params)
  runQuery(QUERIES.list(params.installationid), selectors.rows(done, UserModel.clean))
}

//  * data
//    * email
//    * password
//    * meta
//  * params
//    * installationid
const create = (runQuery, query, done) => {

  let newObjects = {
    client: null,
    collaboration: null
  }

  async.waterfall([

    (next) => {
      UserModel.register(runQuery, {
        data: query.data
      }, next)
    },

    (client, next) => {
      newObjects.client = client
      runQuery(QUERIES.insertCollaboration(client.id, query.params.installationid), selectors.single(next))
    },

    (collaboration, next) => {
      newObjects.collaboration = collaboration
      next()
    }

  ], (err) => {
    if(err) return done(err)
    done(null, newObjects.client)
  })
}

//  * data
//    * email
//    * meta
//  * params
const save = (runQuery, query, done) => UserModel.save(runQuery, query, done)

//  * id
const del = (runQuery, query, done) => UserModel.delete(runQuery, query, done)

module.exports = {
  QUERIES,
  get: get,
  list,
  create,
  save,
  delete: del
}