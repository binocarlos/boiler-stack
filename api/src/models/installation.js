"use strict";
const async = require('async')
const Query = require('../database/query')
const Transaction = require('../database/transaction')
const SQL = require('../database/sql')
const selectors = require('../database/selectors')

// join the installations table to the collaborations the user has
const byUser = (userid) => {
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
}

// create the given user as the owner of the installation
// (transaction)
const create = (data, userid) => {
  return [
    SQL.insert('installation', data),
    SQL.insert('collaboration', {
      useraccount: userid,
      installation: 'lastval()',
      permission: 'owner'
    }, {
      installation: 'raw'
    })
  ]
}

const Installation = (connection, eventBus) => {
  
  const query = Query(connection)
  const transaction = Transaction(connection)

  const list = (userid, done) => query(byUser(userid), selectors.rows(done))
  const create = (data, userid, done) => {
    transaction()
  }
  sql.raw(installationList, [userid], done)

  
  const create = (name, userid, done) => {
    const client = null
    const closeConnection = null
    async.series([
      (next) => db.getConnection((err, c, close) => {
        if(err) return next(err)
        client = c
        closeConnection = close
        next()
      }),

      (next) => {

      }

    ], (err, user) => {

    })
    sql.escapeRaw(createInstallation, [name, userid], done)
  }

  installation.list = list
  installation.create = create

  return installation
}

module.exports = Installation