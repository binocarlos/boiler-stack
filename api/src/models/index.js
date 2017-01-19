"use strict";
const User = require('./user')
const Installation = require('./installation')

function Models(db){
  const user = User(db)
  const installation = Installation(db)

  return {
    user,
    installation
  }
}

module.exports = Models