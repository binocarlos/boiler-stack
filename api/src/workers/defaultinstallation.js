"use strict";
// create a 'default' installation when a new account is registered

const Logger = require('../logger')
const logger = Logger('worker:defaultinstallation')

const DefaultInstallation = (controllers) => (message) => {
  const query = {
    data: {
      name: 'default',
      data: '{}'
    },
    userid: message.result.id
  }
  controllers.installation.create(query, (err, data) => {
    if(err) {
      logger.error({
        error: err,
        message: message
      })
    }
    else {
      logger({
        action: 'complete',
        query,
        message,
        data
      })
    }
  })
}

module.exports = DefaultInstallation