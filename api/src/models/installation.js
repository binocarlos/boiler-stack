"use strict";
const async = require('async')
const Query = require('../database/query')
const Transaction = require('../database/transaction')
const SQL = require('../database/sql')
const selectors = require('../database/selectors')

// manual non-crud queries
// this is a good thing
// please don't write code that tries to wrap anything
// other than basic `select * from thing` type queries
// there are JUST TOO MANY variations and that's what SQL is for
const QUERIES = {

  // single query
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
  }
}

const Installation = (connection, eventBus) => {
  const query = Query(connection)
  const transaction = Transaction(connection)
  const list = (userid, done) => query(QUERIES.byUser(userid), selectors.rows(done))
  
  return {
    list
  }
}

module.exports = Installation