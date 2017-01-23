"use strict";
/*

  factory functions for commonly used queries within models
  
*/

const sql = require('./sql')
const selectors = require('./selectors')
const Query = require('./query')

// CRUD methods
// all use either rows or single selectors
const Crud = (connection, table) => {

  const query = Query(connection)

  const select = (params, done) => query(sql.select(table, params), selectors.rows(done))
  const get = (params, done) => query(sql.select(table, params), selectors.single(done))
  const insert = (data, done) => query(sql.insert(table, data), selectors.single(done))
  const update = (data, params, done) => query(sql.update(table, data, params), selectors.single(done))
  const del = (params, done) => query(sql.delete(table, params), selectors.single(done))

  return {
    select: select,
    get: get,
    insert: insert,
    update: update,
    delete: del
  }
}


module.exports = Crud