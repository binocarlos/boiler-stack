"use strict";
const async = require('async')
const SQL = require('../database/sql')
const selectors = require('../database/selectors')

const prepareData = (resource, installation) => {
  const meta = resource.meta || {}
  return Object.assign({}, resource, {
    installation,
    meta: typeof(meta) == 'string' ?
      meta :
      JSON.stringify(meta)
  })
}

const QUERIES = {

  list: (p) => {
    const sql = `select resource.*
from
  resource
where
(
  resource.installation = $1
)
order by
  resource.name
`

    const params = [p.installationid]

    return {
      sql,
      params
    }
  },

  update: (params, data) => SQL.update('resource', data, params),
  delete: (params) => SQL.delete('resource', params),
}

//   * params
//     * id
const get = (runQuery, query, done) => runQuery(SQL.select('resource', query.params), selectors.single(done))

//   * params
//     * installationid
const list = (runQuery, query, done) => runQuery(QUERIES.list(query.params), selectors.rows(done))

//   * params
//     * installationid
//   * data
//     * name
//     * type
//     * labels[][]
//     * meta
//     * children[resource]
const create = (runQuery, query, done) => runQuery(SQL.insert('resource', prepareData(query.data, query.params.installationid)), selectors.single(done))
const save = (runQuery, query, done) => runQuery(QUERIES.update(query.params, query.data), selectors.single(done, cleanData))
const del = (runQuery, query, done) => runQuery(QUERIES.delete(query.params), selectors.single(done, cleanData))

module.exports = {
  QUERIES,
  get: get,
  list,
  create,
  save,
  delete: del
}