"use strict";

const User = require('./user')
const Installation = require('./installation')
const CommandLog = require('./commandlog')

const Controllers = (client, eventBus) => {

  const connection = client.connection
  const transaction = client.transaction

  const user = User(eventBus)
  const installation = Installation(eventBus)
  const commandlog = CommandLog(eventBus)

  return {
    connection,
    transaction,
    user,
    installation,
    commandlog
  }
}


module.exports = Controllers