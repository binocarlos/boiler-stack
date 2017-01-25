"use strict";
const pino = require('pino')
const hat = require('hat')
const TRACER_KEY = 'x-tracer-id'

const ENV_LOGLEVELS = {
  production: 'info',
  test: 'silent',
  development: 'trace'
}

const NODE_ENV = process.env.NODE_ENV || 'production'
const ENV_LOGLEVEL = ENV_LOGLEVELS[NODE_ENV]
const LOGLEVEL = process.env.LOGLEVEL || ENV_LOGLEVELS[process.env.NODE_ENV] || ENV_LOGLEVELS.production

const mainLogger = pino({
  level: LOGLEVEL
})

const Logger = (data) => {
  data = typeof(data) == 'string' ?
    {name:data} :
    data
  return mainLogger.child(data)
}

// get/set the tracer if on a request
const tracerid = (req) => req.headers[TRACER_KEY] = req.headers[TRACER_KEY] || hat()

Logger.tracer = tracerid

module.exports = Logger