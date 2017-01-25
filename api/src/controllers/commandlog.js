"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')
const crud = Crud('commandlog')

const CommandLogController = (client, eventBus) => {

  // commands
  // query:
  //  * data
  const create = (tracerid, query, done) => {
    crud.insert(client.tracer(query.tracerid), {
      data: JSON.stringify(query.data)
    }, done)
  }

  return {
    create: create
  }
}

module.exports = CommandLogController