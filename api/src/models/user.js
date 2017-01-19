"use strict";
const tools = require('../tools')
const SQL = require('../sql')
const async = require('async')
const EventEmitter = require('events')

const User = (db) => {

  const sql = SQL(db, 'useraccount')
  const user = new EventEmitter()

  const login = (email, password, done) => {
    sql.get({email}, (err, result) => {
      if(err) return done(err)
      if(!result) return done()
      done(null, tools.checkUserPassword(result, password) ? result : null)
    })
  }

  const register = (data, done) => {
    const userData = tools.generateUser(data)
    sql.insertOne(userData, (err, result) => {
      if(err) return done(err)
      user.emit('command', {
        method: 'insertOne',
        data: userData,
        result
      })
      user.emit('created', result)
      done(null, result)
    })
  }

  const save = (data, params, done) => {
    const userData = {data: JSON.stringify(data)}
    sql.updateOne(userData, params, (err, result) => {
      if(err) return done(err)
      user.emit('command', {
        method: 'updateOne',
        data: userData,
        params,
        result
      })
      user.emit('updated', result)
      done(null, result)
    })
  }

  user.login = login
  user.register = register
  user.save = save
  user.get = sql.get

  return user
}

module.exports = User