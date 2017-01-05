"use strict";
const tools = require('../tools')
const Crud = require('./crud')

const user = (db) => {
  const users = Crud(db, 'user')
  const login = (email, password, done) => users.get({email}, user => tools.checkUserPassword(user, password) ? user : null, done)
  return Object.assign({}, users, {
    login
  })
}

const installation = (db) => {
  const installations = Crud(db, 'installation')
  const list = (userid, done) => installations.raw('installation_list', [userid], done)
  return Object.assign({}, users, {
    list
  })
}

module.exports = {
  user,
  installation
}