"use strict";
// create a 'default' installation when a new account is registered

const async = require('async')
const tools = require('../tools')
const Logger = require('../logger')
const logger = Logger('worker:defaultinstallation')

const DefaultInstallation = (controllers) => {

  const installation = controllers.installation
  const transaction = controllers.transaction

  return (tracerid, job) => {

    const userid = job.result.id
    const query = {
      data: {
        name: 'default',
        meta: {}
      },
      userid: userid
    }

    transaction(tracerid, (db, finish) => {

      let results = null
      
      async.waterfall([

        (next) => installation.create(db, query, next),

        (installationData, next) => {
          results = installationData
          installation.activate(db, {
            installationid: installationData.id,
            userid: userid
          }, next)
        },

        (userData, next) => next(null, results)

      ], finish)

    }, tools.jobLogger(logger, tracerid, {
      job,
      query
    }))
  }
}

module.exports = DefaultInstallation