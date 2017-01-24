"use strict";
const tape = require('tape')
const Request = require('request')
const request = Request.defaults({jar: true})

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:80'

tape('acceptance - basic - network', (t) => {
  request({
    method: 'GET',
    url: BASE_URL
  }, (err, res, body) => {
    t.equal(res.statusCode, 200, '200 status')
    t.end()
  })
})