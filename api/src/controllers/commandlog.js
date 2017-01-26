"use strict";

const async = require('async')
const tools = require('../tools')
const Logger = require('../logger')
const logger = Logger('controller:commandlog')

const CommandLogModel = require('../models/commandlog')

const CommandLogController = (eventBus) => {

  //  * data
  const create = (db, query, done) => {
    CommandLogModel.create(db.run, {
      data: JSON.stringify(query.data)
    }, eventBus.emitWrapper({
      logger,
      tracerid: db.id,
      query,
      // remove this and there an infinite loop of
      // commandlogs being created because commandlogs
      // have been created (command logs are created for)
      // eventType = 'command'
      eventType: 'commandlog',
      eventName: 'commandlog.create'
    }, done))
  }

  return {
    create: create
  }
}

module.exports = CommandLogController