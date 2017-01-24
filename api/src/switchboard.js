"use strict";

const Logger = require('./logger')
const logger = Logger('switchboard')

// react to model events and run workers
// we can easily de-couple the switchboard into a job-queue this way
function Switchboard(eventBus, controllers, workers) {

  // which workers to run for which commands (can be array or single worker)
  const COMMANDS = {
    'user.register': workers.defaultInstallation
  }
  
  // main event control loop
  eventBus.listen((channel, message) => {
    logger({
      type: 'event',
      channel,
      message
    })

    // a mutating command
    if(channel == 'command') {

      // record the command
      workers.commandLog(message)

      // trigger the workers from the COMMANDS mapo
      let commandWorkers = COMMANDS[message.name]
      if(commandWorkers) {
        if(typeof(commandWorkers) == 'function') {
          commandWorkers = [commandWorkers]
        }
        commandWorkers.forEach(commandWorker => commandWorker(message))
      }
    }
  })
}

module.exports = Switchboard