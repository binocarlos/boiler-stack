"use strict";

const Logger = require('../logger')
const logger = Logger('worker:commandlog')

// write a row into the command logger table
// for each database mutation
const CommandLog = (controllers) => (message) => {
  controllers.commandlog.create(message, (err, data) => {
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.log('command log created')
    console.dir(data)
  })
}

module.exports = CommandLog