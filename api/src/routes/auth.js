"use strict";
const urlparse = require('url').parse
const async = require('async')
const tools = require('../tools')

function Auth(settings) {

  const queries = settings.queries
  const commands = settings.commands

  const status = (req, res) => {
    res.json({
      loggedIn: req.user ? true : false,
      data: req.user
    })
  }

  const login = (req, res, error) => {
    const email = req.body.email
    const password = req.body.password
    const errorData = {loggedIn: false}
    if(!email) return error(['no email given', 400, errorData])
    if(!password) return error(['no password given', 400, errorData])
    async.waterfall([
      (next) => queries.user.email(req.body.email, next),
      (user, next) => {
        // be ambigous
        if(!user) return next(['incorrect details', 403, errorData])
        if(!tools.checkUserPassword(user, password)) return next(['incorrect details', 403, errorData])
        req.login(user, (err) => next(err, user))
      }
    ], (err, user) => {
      if(err) return error(err)
      res.json({
        loggedIn: true,
        data: user
      })
    })
  }

  const register = (req, res, error) => {
    const email = req.body.email
    const password = req.body.password
    const errorData = {registered: false}
    if(!email) return error(['no email given', 400, errorData])
    if(!password) return error(['no password given', 400, errorData])
    const userRecord = tools.generateUser(email, password)
    async.waterfall([
      (next) => commands.user.create(userRecord, next),
      (user, next) => req.login(user, (err) => next(err, user))
    ], (err, user) => {
      if(err) return error(err)
      res.json({
        registered: true,
        data: user
      })
    })
  }

  const logout = (req, res, error) => {
    var redirectTo = urlparse(req.url, true).query.redirect || '/'
    req.session.destroy(function () {
      res.redirect(redirectTo)
    })
  }

  return {
    status,
    login,
    register,
    logout
  }
}

module.exports = Auth