"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')
const User = require('../models/user')

const getCrud = (client) => Crud(client, 'useraccount')

const UserController = (connection, eventBus, UserModel) => {
  UserModel = UserModel || User

  // queries
  const login = (email, password, done) => {
    connection.query((client, finish) => {
      const handler = UserModel.login(client)
      handler(email, password, finish)
    }, done)
  }

  const get = (id, done) => {
    connection.query((client, finish) => {
      const crud = getCrud(client)
      crud.get({id}, finish)
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