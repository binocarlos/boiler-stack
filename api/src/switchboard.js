"use strict";

// react to model events
function Switchboard(models, eventBus, jobQueue) {
  // hook up the command log insertion
  Object.keys(models || {}).forEach(key => {
    const model = models[key]
    model.on('command', (command) => {
      models.commandLog.create(command, (err) => {
        console.log('command log inserted')
      })
    })
  })

  const jobQueues = {
    userCreate: jobQueue.create('usercreate')
  }

  models.user.on('created', user => {
    jobQueues.userCreate(user)
  })
}

module.exports = Switchboard