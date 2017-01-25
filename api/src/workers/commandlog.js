"use strict";

const Logger = require('../logger')
const logger = Logger('worker:commandlog')

// write a row into the command logger table
// for each database mutation
const CommandLog = (controllers) => (tracerid, job) => {
  controllers.commandlog.create(tracerid, {
    data: job
  }, (err, data) => {
    if(err) {
      logger.error(err, {
        job
      })
    }
    else {
      logger.info({
        msg: 'complete',
        job,
        data
      })
    }
  })
}

module.exports = CommandLog