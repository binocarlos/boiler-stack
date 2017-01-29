"use strict";

const async = require('async')
const tools = require('../tools')
const Logger = require('../logger')
const logger = Logger('controller:user')

const UserModel = require('../models/user')

const UserController = (eventBus) => {

  // QUERIES

  // query:
  //  * email
  //  * password
  const login = (db, query, done) => UserModel.login(db.run, query, done)
  
  // query
  //  * {email,id}
  const get = (db, query, done) => UserModel.getClean(db.run, query, done)

  // COMMANDS

  // query:
  //  * data
  const register = (db, query, done) => {
    UserModel.register(db.run, query, (err, result) => {
      // inject the userid that just registered
      const tracer = err || !result.id ?
        db.tracer :
        Object.assign({}, db.tracer, {
          user: result.id
        })

      const emitWrapper = eventBus.emitWrapper(tracer, {
        logger,
        query,
        eventName: 'user.register'
      }, done)

      emitWrapper(err, result)
    })
  }

  // query:
  //  * data
  //  * params
  const save = (db, query, done) => {
    UserModel.save(db.run, query, eventBus.emitWrapper(db.tracer, {
      logger,
      query,
      eventName: 'user.save'
    }, done))
  }

  return {
    login: login,
    get: get,
    register: register,
    save: save
  }
}

module.exports = UserController