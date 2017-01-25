"use strict";
// create a 'default' installation when a new account is registered

const Logger = require('../logger')
const logger = Logger('worker:defaultinstallation')

const DefaultInstallation = (controllers) => (tracerid, job) => {
  const query = {
    data: {
      name: 'default',
      data: '{}'
    },
    userid: job.result.id
  }

  controllers.installation.createActive(tracerid, query, (err, data) => {
    if(err) {
      logger.error('job', tracerid, {
        error: err.toString(),
        query,
        job
      })
    }
    else {
      logger.info('job', tracerid, {
        job,
        query,
        data
      })
    }
  })  
}

module.exports = DefaultInstallation