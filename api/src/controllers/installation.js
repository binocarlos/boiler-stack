"use strict";

const async = require('async')
const tools = require('../tools')
const InstallationModel = require('../models/installation')

const Logger = require('../logger')
const logger = Logger('controller:installation')

const InstallationController = (client, eventBus) => {
  
  // queries
  const list = (tracerid, query, done) => InstallationModel.byUser(client.tracer(tracerid), query, done)

  // commands
  // query:
  //  * data
  const create = (tracerid, query, done) => {
    client.transaction(tracerid, (runQuery, finish) => {
      InstallationModel.create(runQuery, query, finish)
    }, (err, result) => {
      if(err) {
        logger.error('create', tracerid, {
          error: err.toString,
          query
        })
        return done(err)
      }
      logger.trace('create', tracerid, {
        query,
        result
      })
      eventBus.emit('command', tracerid, {
        name: 'installation.create',
        query,
        result
      })
      done(null, result)
    })
  }

  return {
    list,
    create
  }
}

module.exports = InstallationController