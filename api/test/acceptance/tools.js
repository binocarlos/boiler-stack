"use strict";
const async = require('async')
const Request = require('request')
const request = Request.defaults({jar: true})

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:80'

const url = (path) => {
  path = path || ''
  return BASE_URL + path
}

const UserData = (count) => {
  count = count || ''
  const ts = new Date().getTime()
  return {
    email: 'user' + ts + count + '@test.com',
    password: 'apples'
  }
}

const register = (userData, done) => {
  request({
    method: 'POST',
    url: url('/api/v1/register'),
    json: userData
  }, (err, res, body) => {
    if(err) return done(err)
    done(null, {
      statusCode: res.statusCode,
      body
    })
  })
}

const wrapResult = (done) => (err, res, body) => {
  if(err) return done(err)
  done(null, {
    statusCode: res.statusCode,
    body: body
  })
}

module.exports = {
  UserData,
  request,
  url,
  register,
  wrapResult
}