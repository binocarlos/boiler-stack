"use strict";
const async = require('async')
const SQL = require('../database/sql')
const selectors = require('../database/selectors')

// https://www.postgresql.org/docs/9.3/static/ltree.html

const prepareData = (resource, installation) => {
  const meta = resource.meta || {}
  return Object.assign({}, resource, {
    installation,
    meta: typeof(meta) == 'string' ?
      meta :
      JSON.stringify(meta)
  })
}

const prepareChildren = (resource, installation) => {
  const obj = Object.assign({}, resource)
  const children = obj.children || []
  delete(obj.children)
  return {
    data: prepareData(obj),
    children
  }
}

const assignChildToParent = (parent, child) => {
  let inject = {
    path: [
      parent.path,
      parent.id
    ].join('.')
  }

  if(parent.id) {
    inject.parent = parent.id
    inject.path = [
      parent.path,
      parent.id
    ].join('.')
  }
  else {
    inject.path = parent.path
  }

  return Object.assign({}, child, inject)
}

const getRootParent = (installation) => {
  return {
    installation,
    path: 'root'
  }
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

// create a single resource
const createSingle = (runQuery, query, done) => {
  runQuery(SQL.insert('resource', prepareData(query.data, query.params.installationid)), selectors.single(done))
}

// create resource with children
const createChildren = (runQuery, parent, query, done) => {
  const resource = prepareChildren(assignChildToParent(parent, query.data), query.params.installationid)

  runQuery(SQL.insert('resource', resource.data), selectors.single((err, parent) => {
    if(err) return done(err)

    const childCreators = resource.children.map(child => next => {

      createChildren(runQuery, parent, {
        params: query.params,
        data: child
      }, next)
    })

    async.parallel(childCreators, (err, children) => {
      if(err) return done(err)
      done(null, Object.assign({}, resource, {
        children
      }))
    })
  }))
}

//   * params
//     * parentid
//     * installationid
//   * data
//     * name
//     * type
//     * labels[][]
//     * meta
//     * children[resource]
const create = (runQuery, query, done) => {

  async.waterfall([

    // first get the parent (if any) so we can assign the first level
    (next) => {
      if(!query.params.parentid) {
        const parent = getRootParent(query.params.installationid)
        next(null, parent)
      }
      else {
        runQuery(SQL.select('resource', {
          id: query.params.parentid
        }), selectors.single(done))
      }
    },

    (parent, next) => {
      createChildren(runQuery, parent, query, next)
    }
  ], done)

}

const save = (runQuery, query, done) => runQuery(QUERIES.update(query.params, query.data), selectors.single(done))
const del = (runQuery, query, done) => runQuery(QUERIES.delete(query.params), selectors.single(done))

module.exports = {
  QUERIES,
  get: get,
  list,
  create,
  save,
  delete: del
}