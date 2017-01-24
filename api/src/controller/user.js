"use strict";

const async = require('async')
const tools = require('../tools')
const User = require('../models/user')

const UserController = (connection, eventBus, UserModel) => {
  UserModel = UserModel || User
  const login = (email, password, done) => {
    connection((client, finish) => {
      const handler = UserModel.login(client)
      handler(email, password, finish)
    }, (err, result) => {
      if(err) return done(err)
      done(null, result)
    })
  }

  const register = (data, done) => {
    connection((client, finish) => {
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
    connection((client, finish) => {
      const handler = UserModel.save(client)
      handler(data, finish)
    }, (err, result) => {
      if(err) return done(err)
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