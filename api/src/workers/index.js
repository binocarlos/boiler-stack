"use strict";
const UserCreate = require('./usercreate')

function Workers(models){
  const userCreate = UserCreate(models)
  return {
    userCreate
  }
}

module.exports = Workers