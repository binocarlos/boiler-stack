"use strict";
/*

  factory functions for commonly used queries within models
  
*/

const sql = require('./sql')


// run a generic query via the connection
// the query has:
//  * sql
//  * params
const runQuery = (connection, query, done) => {
  connection((client, finished) => {
    client.query(query.sql, query.params, finished)
  }, done)
}

const rows = (result) => {
  result = result || {}
  return result.rows || []
}

const selectors = {
  // return rows from the raw result
  rows: (done) => (err, results) => {
    if(err) return done(err)
    done(null, rows(results))
  },
  // return a single record from the raw resulr
  single: (done) => (err, results) => {
    if(err) return done(err)
    done(null, rows(results)[0])
  }
}

// CRUD methods
// all use either rows or single selectors
const Crud = (connection, table) => {
  const select = (params, done) => runQuery(connection, sql.select(table, params), selectors.rows(done))
  const get = (params, done) => runQuery(connection, sql.select(table, params), selectors.single(done))
  const insert = (data, done) => runQuery(connection, sql.insert(table, data), selectors.single(done))
  const update = (data, params, done) => runQuery(connection, sql.update(table, data, params), selectors.single(done))
  const del = (params, done) => runQuery(connection, sql.delete(table, params), selectors.single(done))

  return {
    select: select,
    get: get,
    insert: insert,
    update: update,
    delete: del
  }
}


module.exports = Crud