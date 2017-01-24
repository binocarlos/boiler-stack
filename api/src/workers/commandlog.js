"use strict";

const Logger = require('../logger')
const logger = Logger('worker:commandlog')

// write a row into the command logger table
// for each database mutation
const CommandLog = (controllers) => (message) => {
  controllers.commandlog.create(message, (err, data) => {
    if(err) {
      logger.error({
        error: err,
        message: message
      })
    }
    else {
      logger({
        action: 'complete',
        message,
        data
      })
    }
  })
}

module.exports = CommandLog