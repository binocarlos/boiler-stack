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

    async.waterfall([

      (next) => {
        UserModel.register(db.run, query, next)
      },

      (result, next) => {
        db.tracer.user = result.id
        eventBus.emit(db, {
          type: 'command',
          channel: 'user.register',
          query,
          result
        }, next)
      },

      (result, next) => {
        UserModel.getClean(db.run, {
          id: result.id
        }, next)
      }

    ], done)

  }

  // query:
  //  * data
  //  * params
  const save = (db, query, done) => {

    async.waterfall([

      (next) => {
        UserModel.save(db.run, query, next)
      },

      (result, next) => {
        eventBus.emit(db, {
          type: 'command',
          channel: 'user.save',
          query,
          result
        }, next)
      }

    ], done)

  }

  return {
    login: login,
    get: get,
    register: register,
    save: save
  }
}

module.exports = UserController