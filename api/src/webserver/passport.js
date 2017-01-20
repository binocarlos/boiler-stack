"use strict";
const passport = require('passport')

function Passport(userModel) {

  passport.serializeUser(function(req, user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(req, id, done) {
    userModel.get({id}, done)
  })

  return passport
}

module.exports = Passport