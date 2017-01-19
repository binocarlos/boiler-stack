"use strict";

const pg = require('pg')
const Logger = require('./logger')

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

module.exports = Postgres