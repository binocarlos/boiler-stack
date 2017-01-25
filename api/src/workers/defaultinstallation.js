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
  controllers.installation.create(tracerid, query, (err, data) => {
    if(err) {
      logger.error(err, {
        job
      })
    }
    else {
      logger.info({
        msg: 'complete',
        req: { id: tracerid },
        job,
        query,
        data
      })
    }
  })
}

module.exports = DefaultInstallation