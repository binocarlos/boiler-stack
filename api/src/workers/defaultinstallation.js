"use strict";
// create a 'default' installation when a new account is registered

const async = require('async')
const tools = require('../tools')
const Logger = require('../logger')
const logger = Logger('worker:defaultinstallation')

const DefaultInstallation = (controllers) => {

  const installation = controllers.installation
  const transaction = controllers.transaction

  return (tracer, job) => {

    // the result is the user from account creation
    const accountid = job.result.id
    const query = {
      data: {
        name: 'My First Company',
        meta: {}
      },
      accountid: accountid
    }

    transaction(tracer.id, tracer.user, (db, finish) => {

      let results = null
      
      async.waterfall([

        (next) => installation.create(db, query, next),
          
        (installationData, next) => {
          results = installationData
          installation.activate(db, {
            installationid: installationData.id,
            accountid: accountid
          }, next)
        },

        (userData, next) => next(null, results)

      ], finish)

    }, tools.jobLogger(logger, tracer, {
      job,
      query
    }))
  }
}

module.exports = DefaultInstallation