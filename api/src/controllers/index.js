"use strict";

const User = require('./user')
const Installation = require('./installation')

const Controllers = (client, eventBus) => {
  const user = User(client, eventBus)
  const installation = Installation(client, eventBus)
  return {
    user,
    installation
  }
}

module.exports = Controllers