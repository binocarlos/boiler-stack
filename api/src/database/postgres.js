"use strict";

const pg = require('pg')
const Logger = require('../logger')

const logger = Logger('postgres:connection')

function Postgres(settings) {
  const config = Object.assign({}, settings, {
    max: 20,
    min: 4,
    idleTimeoutMillis: 1000
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

  

  return {
    query: runQuery(pool.query.bind(pool)),
    connect: (handler) => {
      pool.connect((err, client, release) => {
        if(err) return handler(err, null, release)
        const query = runQuery(client.query.bind(client))
        handler(null, query, release)
      })
    }
  }
}

module.exports = Postgres