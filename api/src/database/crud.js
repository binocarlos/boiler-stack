"use strict";
/*

  factory functions for commonly used queries within models
  
*/

const sql = require('./sql')
const selectors = require('./selectors')

// CRUD methods
// all use either rows or single selectors
const Crud = (client, table) => {

  const select = (params, done) => client.query(sql.select(table, params), selectors.rows(done))
  const get = (params, done) => client.query(sql.select(table, params), selectors.single(done))
  const insert = (data, done) => client.query(sql.insert(table, data), selectors.single(done))
  const update = (data, params, done) => client.query(sql.update(table, data, params), selectors.single(done))
  const del = (params, done) => client.query(sql.delete(table, params), selectors.single(done))

  return {
    select: select,
    get: get,
    insert: insert,
    update: update,
    delete: del
  }
}


module.exports = Crud