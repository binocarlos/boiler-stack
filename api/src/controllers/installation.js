"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')
const InstallationModel = require('../models/installation')
const UserModel = require('../models/user')

const Logger = require('../logger')
const logger = Logger('controller:installation')

const usercrud = Crud('useraccount')

const InstallationController = (client, eventBus) => {
  
  // queries
  const list = (tracerid, query, done) => InstallationModel.byUser(client.tracer(tracerid), query, done)

  // commands
  const CreateHandler = (runQuery, tracerid, query, done) => {
    InstallationModel.create(runQuery, query, (err, result) => {
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
        name: 'installation.create',
        query,
        result
      })
      done(null, result)
    })
  }

  // update the user with a 'active' installation (written to the user data)
  // query:
  //   * installationid
  //   * userid
  const ActivateHandler = (runQuery, tracerid, query, done) => {
    //const runQuery = client.tracer(tracerid)

    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.log('activate')
    
    async.waterfall([
      (next) => usercrud.get(runQuery, {id: query.userid}, next),
      (user, next) => {
        console.log('-------------------------------------------');
        console.log('-------------------------------------------');
        console.log('-------------------------------------------');
        console.dir(user)
        const newData = Object.assign({}, user.data, {
          activeInstallation: query.installationid
        })

        console.log('-------------------------------------------');
        console.log('-------------------------------------------');
        console.dir(newData)
        UserModel.save(runQuery, {
          data: newData,
          params: {
            id: query.userid
          }
        }, next)
      }
    ], (err, result) => {
      if(err) {
        logger.error('activate', tracerid, {
          error: err.toString,
          query
        })
        return done(err)
      }
      logger.trace('activate', tracerid, {
        query,
        result
      })
      eventBus.emit('command', tracerid, {
        name: 'installation.activate',
        query,
        result
      })
      done(null, result)
    })
  }


  // query:
  //  * userid
  //  * data
  const create = (tracerid, query, done) => {
    client.transaction(tracerid, (runQuery, finish) => {
      CreateHandler(runQuery, tracerid, query, finish)
    }, done)
  }

  // query:
  //  * installationid
  //  * userid
  const activate = (tracerid, query, done) => {
    client.transaction(tracerid, (runQuery, finish) => {
      ActivateHandler(runQuery, tracerid, query, finish)
    }, done)
  }

  // query:
  //  * userid
  //  * data
  const createActive = (tracerid, query, done) => {
    client.transaction(tracerid, (runQuery, finish) => {
      let results = null
      async.waterfall([
        (next) => CreateHandler(runQuery, tracerid, query, next),
        (r, next) => {
          results = r
          ActivateHandler(runQuery, tracerid, {
            installationid: results.installation.id,
            userid: query.userid
          }, next)
        }
      ], (err, user) => {
        if(err) return finish(err)
        results.user = user
        finish(null, results)
      })
    }, done)
  }

  

  return {
    list,
    create,
    activate,
    createActive
  }
}

module.exports = InstallationController