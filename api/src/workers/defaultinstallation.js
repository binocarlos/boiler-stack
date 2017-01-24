"use strict";
// create a 'default' installation when a new account is registered

const Logger = require('../logger')
const logger = Logger('worker:defaultinstallation')

const DefaultInstallation = (controllers) => (message) => {

  console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.log('create a new installation!!!')
  console.log(JSON.stringify(message, null, 4))
}

module.exports = DefaultInstallation