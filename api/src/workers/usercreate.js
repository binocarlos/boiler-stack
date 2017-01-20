"use strict";

const Logger = require('../logger')
const logger = Logger('userCreate')

// create a 'default' installation when a new account is registered
const UserCreate = (models) => (user) => {

  models.installation.create('default', user.id, (err, installation) => {
    if(err){
      logger.error({
        message: err.message,
        stack: err.stack
      })
    }
    else{
      logger({
        action: 'job',
        job: 'userCreate',
        user: user,
        installation: installation
      })
    }
  })
}

module.exports = UserCreate