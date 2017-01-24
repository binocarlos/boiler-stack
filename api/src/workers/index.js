"use strict";
const DefaultInstallation = require('./defaultinstallation')
const CommandLog = require('./commandlog')

function Workers(controllers){
  const defaultInstallation = DefaultInstallation(controllers)
  const commandLog = CommandLog(controllers)

  return {
    defaultInstallation,
    commandLog
  }
}

module.exports = Workers