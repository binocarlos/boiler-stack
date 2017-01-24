"use strict";
const tape = require('tape')
const async = require('async')
const tools = require('./tools')

const UserData = () => {
  const ts = new Date().getTime()
  return {
    email: 'user' + ts + '@test.com',
    password: 'apples'
  }
}

tape('acceptance - auth - register', (t) => {
  const userData = UserData()

  async.series({

    register: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/register'),
        json: userData
      }, (err, res, body) => {
        if(err) return next(err)
        next(null, {
          statusCode: res.statusCode,
          body: body
        })
      })
    },

    status: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/status'),
        json: true
      }, (err, res, body) => {
        if(err) return next(err)
        next(null, {
          statusCode: res.statusCode,
          body: body
        })
      })
    }

  }, (err, results) => {

    if(err) t.error(err)

    const register = results.register
    const status = results.status

    t.equal(register.statusCode, 201, 'register = 201 status')
    t.equal(status.statusCode, 200, 'status = 200 status')

    t.equal(register.body.registered, true, 'registered status')
    t.equal(status.body.loggedIn, true, 'loggedIn status')

    t.equal(register.body.data.email, userData.email, 'register email is correct')
    t.equal(status.body.data.email, userData.email, 'status email is correct')

    t.equal(register.body.data.hashed_password, undefined, 'no password deets')
    t.equal(status.body.data.hashed_password, undefined, 'no password deets')

    t.end()
  })
})