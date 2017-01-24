"use strict";
const passport = require('passport')

function Passport(userController) {

  passport.serializeUser(function(req, user, done) {
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.dir(user)
    done(null, user.id)
  })

  passport.deserializeUser(function(req, id, done) {
    userController.get({id}, done)
  })

  return passport
}

module.exports = Passport