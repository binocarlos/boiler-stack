"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')
const User = require('../models/user')

const crud = Crud('useraccount')

const UserController = (client, eventBus, UserModel) => {
  UserModel = UserModel || User

  // queries
  // query:
  //  * email
  //  * password
  const login = (query, done) => UserModel.login(client.query, query, done)
  
  // query {}
  const get = (query, done) => {
    crud.get(client.query, query, (err, data) => {
      if(err) return done(err)
      done(null, User.clean(data))
    })
  }

  // commands
  // query:
  //  * data
  const register = (query, done) => {
    UserModel.register(client.query, query, (err, result) => {
      if(err) return done(err)
      eventBus.emit('user.register', {
        query,
        result
      })
      done(null, result)
    })
  }

  // query:
  //  * data
  //  * params
  const save = (query, done) => {
    client.transaction((runQuery, finish) => {
      UserModel.save(runQuery, query, finish)
    }, (err, result) => {
      if(err) return done(err)
      eventBus.emit('user.save', {
        query,
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