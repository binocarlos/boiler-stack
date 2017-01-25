"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')
const UserModel = require('../models/user')

const crud = Crud('useraccount')

const UserController = (client, eventBus) => {
  // queries
  // query:
  //  * email
  //  * password
  const login = (tracerid, query, done) => UserModel.login(client.tracer(query.tracerid), query, done)
  
  // query {}
  const get = (tracerid, query, done) => {
    crud.get(client.tracer(query.tracerid), query, (err, data) => {
      if(err) return done(err)
      done(null, UserModel.clean(data))
    })
  }

  // commands
  // query:
  //  * data
  const register = (tracerid, query, done) => {
    UserModel.register(client.tracer(query.tracerid), query, (err, result) => {
      if(err) return done(err)
      eventBus.emit('command', query.tracerid, {
        name: 'user.register',
        query,
        result
      })
      done(null, result)
    })
  }

  // query:
  //  * data
  //  * params
  const save = (tracerid, query, done) => {
    UserModel.save(client.tracer(query.tracerid), query, (err, result) => {
      if(err) return done(err)
      eventBus.emit('command', query.tracerid, {
        name: 'user.save',
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