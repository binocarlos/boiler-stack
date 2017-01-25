"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')

const Logger = require('../logger')
const logger = Logger('controller:commandlog')

const crud = Crud('commandlog')

const CommandLogController = (client, eventBus) => {


  // commands
  // query:
  //  * data
  const create = (tracerid, query, done) => {
    crud.insert(client.tracer(tracerid), {
      data: JSON.stringify(query.data)
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
    })
  }

  return {
    create: create
  }
}

module.exports = CommandLogController