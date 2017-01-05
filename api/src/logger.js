"use strict";
const pino = require('pino')

function Logger(name) {
  const logger = pino()
  function log(data) {
    if(process.env.NODE_ENV != 'production') {
      logger.info(Object.assign({}, data, {
        name: name
      }))
    }
  }

  log.error = function(err) {
    logger.error(err)    
  }
  
  return log
}

module.exports = Logger