"use strict";

const async = require('async')
const tools = require('../tools')
const Logger = require('../logger')
const logger = Logger('controller:installation')

const InstallationModel = require('../models/installation')
const UserModel = require('../models/user')

const InstallationController = (eventBus) => {
  
  // queries
  const list = (db, query, done) => InstallationModel.byUser(db.run, query, done)

  // commands
  const create = (db, query, done) => {
    InstallationModel.create(db.run, query, eventBus.emitWrapper({
      logger,
      tracerid: db.id,
      query,
      eventName: 'installation.create'
    }, done))
  }

  // update the user with a 'active' installation (written to the user data)
  // query:
  //   * installationid
  //   * userid
  const activate = (db, query, done) => {
    async.waterfall([
      (next) => UserModel.get(db.run, {id: query.userid}, next),
      (user, next) => {
        const newMeta = Object.assign({}, user.meta, {
          activeInstallation: query.installationid
        })
        UserModel.save(db.run, {
          data: {
            meta: newMeta
          },
          params: {
            id: query.userid
          }
        }, next)
      }
    ], eventBus.emitWrapper({
      logger,
      tracerid: db.id,
      query,
      eventName: 'installation.activate'
    }, done))
  }

  // * data
  // * params
  const save = (db, query, done) => {
    InstallationModel.save(db.run, query, eventBus.emitWrapper({
      logger,
      tracerid: db.id,
      query,
      eventName: 'installation.save'
    }, done))
  }

  const del = (db, query, done) => {
    InstallationModel.delete(db.run, query, eventBus.emitWrapper({
      logger,
      tracerid: db.id,
      query,
      eventName: 'installation.delete'
    }, done))
  }

  return {
    list,
    create,
    activate,
    save,
    delete: del
  }
}

module.exports = InstallationController