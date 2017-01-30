"use strict";

const async = require('async')
const tools = require('../tools')

const ClientModel = require('../models/client')
const UserModel = require('../models/user')

const ClientController = (eventBus) => {
  
  // queries
  const get = (db, params, done) => ClientModel.get(db.run, params, done)
  const list = (db, params, done) => ClientModel.list(db.run, params, done)
  const hasInstallation = (db, params, done) => ClientModel.hasInstallation(db.run, params, done)

  // data for a new client
  const newData = () => {
    return {
      email: tools.getRandomEmail(),
      password: tools.getRandomPassword()
    }
  }
  // commands
  //   * params
  //     * installationid
  //   * data
  //     * email
  //     * password
  //     * meta
  const create = (db, query, done) => {

    async.waterfall([

      (next) => {
        ClientModel.create(db.run, query, next)
      },

      (result, next) => {
        eventBus.emit(db, {
          type: 'command',
          channel: 'client.create',
          query,
          result
        }, next)
      }

    ], done)
    
  }

  // * data
  // * params
  const save = (db, query, done) => {

    async.waterfall([

      (next) => {
        ClientModel.save(db.run, query, next)
      },

      (result, next) => {
        eventBus.emit(db, {
          type: 'command',
          channel: 'client.save',
          query,
          result
        }, next)
      }
    ], done)
  }

  const del = (db, query, done) => {

    async.waterfall([

      (next) => {
        ClientModel.delete(db.run, query, next)
      },

      (result, next) => {
        eventBus.emit(db, {
          type: 'command',
          channel: 'client.delete',
          query,
          result
        }, next)
      }
    ], done)
    
  }

  return {
    newData: newData,
    get: get,
    list,
    create,
    save,
    delete: del
  }
}

module.exports = ClientController