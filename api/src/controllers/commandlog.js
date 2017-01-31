"use strict";

const async = require('async')
const tools = require('../tools')
const Logger = require('../logger')
const logger = Logger('controller:commandlog')

const CommandLogModel = require('../models/commandlog')

const CommandLogController = (eventBus) => {

  // we don't emit an event for this because
  // otherwise we would get an infinite loop
  // of command log creating command log creating command log
  //  * data
  const create = (db, query, done) => {

    console.log('-------------------------------------------');
    console.log(JSON.stringify(db.tracer, null, 4))
    console.log(JSON.stringify(query, null, 4))
    CommandLogModel.create(db.run, {
      data: {
        data: JSON.stringify(query.data)
      }
    }, done)
  }

  return {
    create: create
  }
}

module.exports = CommandLogController