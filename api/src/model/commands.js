"use strict";
const tools = require('../tools')
const Crud = require('./crud')

const user = (db) => {
  const users = Crud(db, 'user')
  return Object.assign({}, users, {
    register: (data, done) => users.insert(tools.generateUser(data), done),
    save: (data, params, done) => users.update({data:JSON.stringify(data)}, params, done)
  })
}

const installation = (db) => Crud(db, 'installation')

module.exports = {
  user,
  installation
}