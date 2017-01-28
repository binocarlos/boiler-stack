"use strict";

const Logger = require('../logger')
const logger = Logger('worker:commandlog')

// write a row into the command logger table
// for each database mutation
const CommandLog = (controllers) => {
  const commandlog = controllers.commandlog
  const connection = controllers.connection

  return (tracer, job) => {
    commandlog.create(connection(tracer.id, tracer.user), {
      data: job
    }, (err, data) => {
      if(err) {
        logger.error('job', tracer, {
          error: err.toString(),
          job
        })
      }
      else {
        logger.info('job', tracer, {
          job,
          data
        })
      }
    })
  }
}

module.exports = CommandLog