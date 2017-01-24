"use strict";

const User = require('./user')
const Installation = require('./installation')
const CommandLog = require('./commandlog')

const Controllers = (client, eventBus) => {
  const user = User(client, eventBus)
  const installation = Installation(client, eventBus)
  const commandlog = CommandLog(client, eventBus)
  
  return {
    user,
    installation,
    commandlog
  }
}

module.exports = Controllers