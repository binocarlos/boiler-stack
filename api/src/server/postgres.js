"use strict";
const Logger = require('../logger')

const logger = Logger('postgres')

function Postgres(settings) {
  const config = Object.assign({}, settings, {
    max: 10,
    idleTimeoutMillis: 30000
  })
  
  const pool = new pg.Pool(config)
  let acquireCount = 0
  let connectCount = 0

  pool.on('acquire', client => {
    acquireCount++
    logger({
      action: 'acquire',
      count: acquireCount
    })
  })

  pool.on('connect', client => {
    connectCount++
    logger({
      action: 'connect',
      count: connectCount
    })
  })

  pool.on('error', function (error, client) {
    logger.error({
      message: error.message,
      stack: error.stack
    })
  })

  return pool
}

function Query(settings) {
  postgres = Postgres(settings)
  function query(sql, values, done) {
    if(typeof(sql) == 'object'){
      sql = sql.sql
      values = sql.values
      done = values
    }
    postgres.connect((err, client, returnConnection) => {
      if(err) {
        logger.error(err)
        return done(err)
      }
      client.query(sql, values, (error, results) => {
        returnConnection()
        if(error){
          logger.error({
            sql,
            values,
            message: error.message,
            stack: error.stack
          })
          return done(error.message)
        }
        const rows = results.rows
        logger({
          action: 'query',
          sql,
          values,
          results: (rows || []).length
        })
        done(null, rows)
      })
    })
  }
  return query
}

function where(obj, schema) {
  obj = obj || {}
  schema = schema || {}
  const sql = Object.keys(obj)
    .map((f, i) => `  "${f}" = $${i+1}${schema[f] ? '::' + schema[f] : ''}`)
    .join("\n  and\n")
  const values = Object.keys(obj).map(f => obj[f])
  return {
    sql,
    values
  }
}

function selectSQL(table, obj, schema) {
  const clause = where(obj, schema)
  const sql = `select * from "${table}"
where
${clause.sql}
`
  return {
    sql,
    values: clause.values
  }
}

function insertSQL(table, obj, schema) {
  obj = obj || {}
  schema = schema || {}
  const fields = Object.keys(obj)
    .map(f => `  "${f}"`)
    .join(",\n")
  const placeholders = Object.keys(obj)
    .map((f, i) => `  $${i+1}${schema[f] ? '::' + schema[f] : ''}`)
    .join(",\n")
  const values = Object.keys(obj)
    .map(f => obj[f])
  const sql = `insert into "${table}"
(
${fields}
)
values
(
${placeholders}
)
returning *
`
  return {
    sql,
    values
  }
}

function updateSQL(table, obj, clause, schema) {
  obj = obj || {}
  schema = schema || {}
  if(!clause) throw new Error('clause required')
  clauseValues = clauseValues || []
  const placeholders = Object.keys(obj)
    .map((f, i) => `set "${f}" = $${i+1+clause.values.length}${schema[f] ? '::' + schema[f] : ''}`)
    .join(",\n")
  const values = clause.values.concat(Object.keys(obj).map(f => obj[f]))
  const sql = `update "${table}"
${placeholders}
where
${clause.sql}
returning *
`
  return {
    sql,
    values
  }
}

function deleteSQL(table, clause) {
  obj = obj || {}
  if(!clause) throw new Error('clause required')
  const sql = `delete from "${table}"
where
${clause.sql}
`
  return {
    sql,
    values: clause.values
  }
}

function Database(settings, rawQueries) {
  const query = Query(settings)
  const load = (table, params, done) => query(selectSQL(table, params), done)
  const insert = (table, data, done) => query(insertSQL(table, data), done)
  const update = (table, data, params, done) => query(updateSQL(table, data, where(params)), done)
  const del = (table, params, done) => query(deleteSQL(table, where(params)), done)
  const raw = (name, params, done) => {
    const sql = rawQueries[name]
    if(!sql) return done('no raw query found: ' + name)
    query(sql, params, done)
  }
  return {
    load,
    insert,
    update,
    del,
    raw
  }
}

module.exports = Database