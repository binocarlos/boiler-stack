"use strict";

const async = require('async')

const Logger = require('../logger')
const DefaultInstallation = require('./defaultinstallation')

const logger = Logger('switchboard')

function Switchboard(controllers, eventBus) {

  const commandlog = controllers.commandlog
  const installation = controllers.installation
  const user = controllers.user

  const defaultInstallation = DefaultInstallation(controllers)

  const COMMANDS = {
    'user.register': [
      (db, event, next) => {
        defaultInstallation(db, {
          accountid: event.result.id
        }, next)
      }
    ]
  }

  // LISTENERS

  // log every event
  eventBus.listen((db, event, done) => {
    logger.debug('event', db.tracer, {
      event
    })
    done()
  })

  // for every command - insert a command log
  eventBus.listen((db, event, done) => {
    if(event.type == 'command') {
      commandlog.create(db, {
        data: event
      }, done)  
    }
    else {
      done()
    }
  })

  // main command reactor
  eventBus.listen((db, event, done) => {
    if(event.type != 'command') return done()
    const handlers = COMMANDS[event.channel] || []
    async.series(handlers.map(handler => next => handler(db, event, next)), done) 
  })
}

module.exports = Switchboard