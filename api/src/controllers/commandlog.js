"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')
const crud = Crud('commandlog')

const CommandLogController = (client, eventBus) => {

  // commands
  // query:
  //  * data
  const create = (data, done) => {
    crud.insert(client.query, {
      data: JSON.stringify(data)
    }, done)
  }

  return {
    create: create
  }
}

module.exports = CommandLogController