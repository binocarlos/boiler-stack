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

    async.waterfall([

      (next) => {
        InstallationModel.create(db.run, query, next)
      },

      (result, next) => {
        eventBus.emit(db, {
          type: 'command',
          channel: 'installation.create',
          query,
          result
        }, next)
      }

    ], done)
    
  }

  // update the user with a 'active' installation (written to the user data)
  // query:
  //   * installationid
  //   * accountid
  const activate = (db, query, done) => {

    async.waterfall([

      (next) => {
        async.parallel({
          user: (pnext) => UserModel.get(db.run, {id: query.accountid}, pnext),
          accessLevel: (pnext) => InstallationModel.accessLevel(db.run, {
            accountid: query.accountid,
            installationid: query.installationid
          }, pnext)
        }, next)
      },

      (results, next) => {
        const user = results.user
        const accessLevel = results.accessLevel

        const newMeta = Object.assign({}, user.meta, {
          activeInstallation: query.installationid,
          installationAccess: accessLevel
        })

        console.log('-------------------------------------------');
        console.log('-------------------------------------------');
        console.dir(newMeta)

        UserModel.save(db.run, {
          data: {
            meta: newMeta
          },
          params: {
            id: query.accountid
          }
        }, next)
      },

      (result, next) => {
        eventBus.emit(db, {
          type: 'command',
          channel: 'installation.activate',
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
        InstallationModel.save(db.run, query, next)
      },

      (result, next) => {
        eventBus.emit(db, {
          type: 'command',
          channel: 'installation.save',
          query,
          result
        }, next)
      }
    ], done)
  }

  const del = (db, query, done) => {

    async.waterfall([

      (next) => {
        InstallationModel.delete(db.run, query, next)
      },

      (result, next) => {
        eventBus.emit(db, {
          type: 'command',
          channel: 'installation.delete',
          query,
          result
        }, next)
      }
    ], done)
    
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