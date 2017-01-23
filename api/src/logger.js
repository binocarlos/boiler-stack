"use strict";
const pino = require('pino')

const SILENT_ENVS = {
  production: true,
  test: true
}

const shouldLog = () => SILENT_ENVS[process.env.NODE_ENV] ? false : true

const Logger = (name) => {
  const logger = pino()
  const log = (data) => {
    if(!shouldLog()) return
    logger.info(Object.assign({}, data, {
      name: name
    }))
  }

  log.error = (err) => {
    if(!shouldLog()) return
    logger.error(err)    
  }
  
  return log
}

module.exports = Logger