"use strict";
const UserCreate = require('./usercreate')

function Workers(jobQueue){
  const userCreate = jobQueue.worker('usercreate', UserCreate)
  return {
    userCreate
  }
}

module.exports = Workers