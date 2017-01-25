"use strict";
const passport = require('passport')
const Logger = require('../logger')
const logger = Logger('passport')
function Passport(userController) {

  passport.serializeUser((req, user, done) => {
    logger.trace('serializeUser', {
      user
    })
    done(null, user.id)
  })
  passport.deserializeUser((req, id, done) => {
    userController.get(req.id, {
      id
    }, (err, user) => {
      if(err) return done(err)
      logger.trace('deserializeUser', {
        id,
        user
      })
      done(null, user)
    })
  })
    
  return passport
}

module.exports = Passport