"use strict";

const SQL = require('../database/sql')
const selectors = require('../database/selectors')

const QUERIES = {
  insert: (data) => SQL.insert('commandlog', data)
}

const create = (runQuery, data, done) => runQuery(QUERIES.insert(data), selectors.single(done))

module.exports = {
  create
}