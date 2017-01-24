"use strict";

const Transaction = require('../database/transaction')
const User = require('./user')
const Installation = require('./installation')

const Controllers = (connection, eventBus) => {
  connection = {
    query: connection,
    transaction: Transaction(connection)
  }
  const user = User(connection, eventBus)
  const installation = Installation(connection, eventBus)
  return {
    user,
    installation
  }
}

module.exports = Controllers