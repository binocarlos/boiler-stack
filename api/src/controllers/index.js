"use strict";

const User = require('./user')
const Installation = require('./installation')
const Client = require('./client')
const CommandLog = require('./commandlog')

const Controllers = (dbclient, eventBus) => {

  const connection = dbclient.connection
  const transaction = dbclient.transaction

  const user = User(eventBus)
  const installation = Installation(eventBus)
  const client = Client(eventBus)
  const commandlog = CommandLog(eventBus)

  return {
    connection,
    transaction,
    user,
    installation,
    client,
    commandlog
  }
}


module.exports = Controllers