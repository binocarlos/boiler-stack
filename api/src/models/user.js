"use strict";
const tools = require('../tools')
const SQL = require('../sql')

const User = (db) => {
  const sql = SQL(db, 'user')

  const login = (email, password, done) => {
    sql.get({email}, (err, user) => {
      if(err) return done(err)
      if(!user) return done()
      done(null, tools.checkUserPassword(user, password) ? user : null)
    })
  }
  const register = (data, done) => sql.insert(tools.generateUser(data), done)
  const save = (data, params, done) => sql.update({data:JSON.stringify(data)}, params, done)

  return {
    login,
    register,
    save
  }
}

module.exports = User