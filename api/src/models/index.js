"use strict";

const User = require('./user')
const Installation = require('./installation')
const CommandLog = require('./commandLog')

function Models(db){
  const user = User(db)
  const installation = Installation(db)
  const commandLog = CommandLog(db)

  return {
    user,
    installation,
    commandLog
  }
}

module.exports = Models