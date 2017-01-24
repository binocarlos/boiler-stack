"use strict";
/*

  factory functions for commonly used queries within models
  
*/

const sql = require('./sql')
const selectors = require('./selectors')

// CRUD methods
// all use either rows or single selectors
const Crud = (table) => {

  const select = (query, params, done) => query(sql.select(table, params), selectors.rows(done))
  const get = (query, params, done) => query(sql.select(table, params), selectors.single(done))
  const insert = (query, data, done) => query(sql.insert(table, data), selectors.single(done))
  const update = (query, data, params, done) => query(sql.update(table, data, params), selectors.single(done))
  const del = (query, params, done) => query(sql.delete(table, params), selectors.single(done))

  return {
    select: select,
    get: get,
    insert: insert,
    update: update,
    delete: del
  }
}


module.exports = Crud