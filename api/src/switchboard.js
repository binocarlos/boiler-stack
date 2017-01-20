"use strict";

const Logger = require('./logger')
const logger = Logger('switchboard')

// record the commands for each model
function commandRecorder(models) {
  Object.keys(models || {}).forEach(key => {
    const model = models[key]
    model.on('command', (command) => {
      models.commandLog.create(command, (err) => {
        logger({
          action: 'command',
          command
        })
      })
    })
  })
}

// react to model events and run workers
// we can easily de-couple the switchboard into a job-queue this way
function Switchboard(models, workers) {
  commandRecorder(models)
  
  models.user.on('created', user => workers.userCreate(user))
}

module.exports = Switchboard