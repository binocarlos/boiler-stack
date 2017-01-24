"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')
const User = require('../models/user')

const crud = Crud('useraccount')

const UserController = (connection, eventBus, UserModel) => {
  UserModel = UserModel || User

  // queries
  const login = (email, password, done) => {
    connection.query((query, finish) => {
      const handler = UserModel.login(query)
      handler(email, password, finish)
    }, done)
  }

  const get = (params, done) => {
    connection.query((query, finish) => {
      crud.get(query, params, finish)
    }, done)
  }

  // commands
  const register = (data, done) => {
    connection.transaction((query, finish) => {
      const handler = UserModel.register(query)
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
    connection.transaction((query, finish) => {
      const handler = UserModel.save(query)
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
    login: login,
    get: get,
    register: register,
    save: save
  }
}

module.exports = UserController