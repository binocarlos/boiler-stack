"use strict";
const passport = require('passport')

function Passport(queries) {
  passport.serializeUser(function(req, user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(req, id, done) {
    queries.user.get({id}, done)
  })

  return passport
}

module.exports = Passport