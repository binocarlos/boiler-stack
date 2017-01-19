"use strict";
const tools = require('../tools')
const SQL = require('../sql')
const EventEmitter = require('events')

const CommandLog = (db) => {
  const sql = SQL(db, 'commandlog')
  const commandLog = new EventEmitter()

  const create = (data, done) => sql.insertOne(data, done)

  commandLog.create = create

  return commandLog
}

module.exports = CommandLog