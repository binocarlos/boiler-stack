"use strict";

const async = require('async')
const tools = require('../tools')
const Logger = require('../logger')
const logger = Logger('controller:installation')

const InstallationModel = require('../models/installation')
const UserModel = require('../models/user')

const InstallationController = (eventBus) => {
  
  // queries
  const get = (db, query, done) => InstallationModel.get(db.run, query, done)
  const list = (db, query, done) => InstallationModel.byUser(db.run, query, done)
  const accessLevel = (db, query, done) => InstallationModel.accessLevel(db.run, query, done)

  // commands
  const create = (db, query, done) => {
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.dir(db.tracer)
    InstallationModel.create(db.run, query, eventBus.emitWrapper(db.tracer, {
      logger,
      query,
      eventName: 'installation.create'
    }, done))
  }

  // update the user with a 'active' installation (written to the user data)
  // query:
  //   * installationid
  //   * accountid
  const activate = (db, query, done) => {
    async.waterfall([
      (next) => UserModel.get(db.run, {id: query.accountid}, next),
      (user, next) => {
        const newMeta = Object.assign({}, user.meta, {
          activeInstallation: query.installationid
        })
        UserModel.save(db.run, {
          data: {
            meta: newMeta
          },
          params: {
            id: query.accountid
          }
        }, next)
      }
    ], eventBus.emitWrapper(db.tracer, {
      logger,
      query,
      eventName: 'installation.activate'
    }, done))
  }

  // * data
  // * params
  const save = (db, query, done) => {
    InstallationModel.save(db.run, query, eventBus.emitWrapper(db.tracer, {
      logger,
      query,
      eventName: 'installation.save'
    }, done))
  }

  const del = (db, query, done) => {
    InstallationModel.delete(db.run, query, eventBus.emitWrapper(db.tracer, {
      logger,
      query,
      eventName: 'installation.delete'
    }, done))
  }

  return {
    list,
    accessLevel,
    create,
    activate,
    save,
    delete: del,
    get: get
  }
}

module.exports = InstallationController