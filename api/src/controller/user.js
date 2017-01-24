"use strict";

const async = require('async')
const tools = require('../tools')
const User = require('../models/user')

const UserController = (connection, eventBus, UserModel) => {
  UserModel = UserModel || User

  // queries
  const login = (email, password, done) => {
    connection.query((client, finish) => {
      const handler = UserModel.login(client)
      handler(email, password, finish)
    }, done)
  }

  // commands
  const register = (data, done) => {
    connection.transaction((client, finish) => {
      const handler = UserModel.register(client)
      handler(data, finish)
    }, (err, result) => {
      if(err) return done(err)
      eventBus.emit('user.register', {
        query: { data },
        result
      })
      done(null, result)
    })
  }

  const save = (data, params, done) => {
    connection.transaction((client, finish) => {
      const handler = UserModel.save(client)
      handler(data, params, finish)
    }, (err, result) => {
      if(err) return done(err)
      eventBus.emit('user.save', {
        query: { data, params },
        result
      })
      done(null, result)
    })
  }

  return {
    login,
    register,
    save
  }
}

module.exports = UserController