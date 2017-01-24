"use strict";
const async = require('async')
const Request = require('request')
const request = Request.defaults({jar: true})

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:80'

const url = (path) => {
  path = path || ''
  return BASE_URL + path
}

const UserData = () => {
  const ts = new Date().getTime()
  return {
    email: 'user' + ts + '@test.com',
    password: 'apples'
  }
}

const login = (userData, done) => {
  request({
    method: 'POST',
    url: tools.url('/api/v1/register'),
    json: userData
  }, done)
}

module.exports = {
  UserData,
  request,
  url,
  login
}