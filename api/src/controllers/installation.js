"use strict";

const async = require('async')
const tools = require('../tools')
const InstallationModel = require('../models/installation')

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
      if(err) return done(err)
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