"use strict";
const tape = require('tape')
const Request = require('request')
const request = Request.defaults({jar: true})

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:80'

const url = (path) => {
  path = path || ''
  return BASE_URL + path
}

module.exports = {
  request,
  url
}