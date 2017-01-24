"use strict";
const tape = require('tape')
const tools = require('./tools')
const VERSION = require('../../package.json').version

tape('acceptance - basic - network', (t) => {
  tools.request({
    method: 'GET',
    url: tools.url()
  }, (err, res, body) => {
    t.equal(res.statusCode, 200, '200 status')
    t.end()
  })
})

tape('acceptance - basic - version', (t) => {
  tools.request({
    method: 'GET',
    url: tools.url('/api/v1/version')
  }, (err, res, body) => {
    t.equal(body, VERSION, 'version is correct')
    t.end()
  })
})