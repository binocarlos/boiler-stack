"use strict";
const urlparse = require('url').parse
const async = require('async')

function Auth(controller) {

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
      (next) => {
        controller.login(req.id, {
          email,
          password
        }, next)
      },
      (user, next) => req.login(user, (err) => next(err, user))
    ], (err, user) => {
      if(err) return error(err)
      res.json({
        loggedIn: user ? true : false,
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
    async.waterfall([
      (next) => {
        controller.register(req.id, {
          data: {
            email,
            password
          }
        }, next)
      },
      (user, next) => req.login(user, (err) => next(err, user))
    ], (err, user) => {
      if(err) return error(err)
      res.status(201)
      res.json({
        registered: true,
        data: user
      })
    })
  }

  const update = (req, res, error) => {
    const data = req.body
    const errorData = {updated: false}
    if(!data) return error(['no data given', 400, errorData])
    controller.save(req.id, {
      data,
      params: {
        id: req.user.id
      }
    }, (err, user) => {
      if(err) return error(err)
      res.json({
        updated: true,
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
    update,
    logout
  }
}

module.exports = Auth