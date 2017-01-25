"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')
const UserModel = require('../models/user')

const Logger = require('../logger')
const logger = Logger('controller:user')

const crud = Crud('useraccount')

const UserController = (client, eventBus) => {
  // queries
  // query:
  //  * email
  //  * password
  const login = (tracerid, query, done) => UserModel.login(client.tracer(tracerid), query, done)
  
  // query {}
  const get = (tracerid, query, done) => {
    crud.get(client.tracer(tracerid), query, (err, data) => {
      if(err) return done(err)
      done(null, UserModel.clean(data))
    })
  }

  // commands
  // query:
  //  * data
  const register = (tracerid, query, done) => {
    UserModel.register(client.tracer(tracerid), query, (err, result) => {
      if(err) {
        logger.error('create', tracerid, {
          error: err.toString,
          query
        })
        return done(err)
      }
      logger.trace('create', tracerid, {
        query,
        result
      })
      eventBus.emit('command', tracerid, {
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
    UserModel.save(client.tracer(tracerid), query, (err, result) => {
      if(err) {
        logger.error('create', tracerid, {
          error: err.toString,
          query
        })
        return done(err)
      }
      logger.trace('create', tracerid, {
        query,
        result
      })
      eventBus.emit('command', tracerid, {
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