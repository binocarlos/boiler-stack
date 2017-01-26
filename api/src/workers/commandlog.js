"use strict";

const Logger = require('../logger')
const logger = Logger('worker:commandlog')

// write a row into the command logger table
// for each database mutation
const CommandLog = (controllers) => {
  const commandlog = controllers.commandlog
  const connection = controllers.connection

  return (tracerid, job) => {
    commandlog.create(connection(tracerid), {
      data: job
    }, (err, data) => {
      if(err) {
        logger.error('job', tracerid, {
          error: err.toString(),
          job
        })
      }
      else {
        logger.info('job', tracerid, {
          job,
          data
        })
      }
    })
  }
}

module.exports = CommandLog