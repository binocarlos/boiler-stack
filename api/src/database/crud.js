"use strict";
/*

  factory functions for commonly used queries within models
  
*/

const sql = require('./sql')
const selectors = require('./selectors')

// CRUD methods
// all use either rows or single selectors
const Crud = (table) => {

  const select = (runQuery, params, done) => runQuery(sql.select(table, params), selectors.rows(done))
  const get = (runQuery, params, done) => runQuery(sql.select(table, params), selectors.single(done))
  const insert = (runQuery, data, done) => runQuery(sql.insert(table, data), selectors.single(done))
  const update = (runQuery, data, params, done) => runQuery(sql.update(table, data, params), selectors.single(done))
  const del = (runQuery, params, done) => runQuery(sql.delete(table, params), selectors.single(done))

  return {
    select: select,
    get: get,
    insert: insert,
    update: update,
    delete: del
  }
}


module.exports = Crud