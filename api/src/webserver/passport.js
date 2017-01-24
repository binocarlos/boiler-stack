"use strict";
const passport = require('passport')

function Passport(userController) {

  passport.serializeUser((req, user, done) => done(null, user.id))
  passport.deserializeUser((req, id, done) => userController.get({id}, done))
    
  return passport
}

module.exports = Passport