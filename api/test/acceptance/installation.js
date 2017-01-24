"use strict";
const tape = require('tape')
const async = require('async')
const tools = require('./tools')

// check that when we register - we get a default installation owned by us
tape('acceptance - installation - default on register', (t) => {
  const userData = tools.UserData()

  async.series({

    register: (next) => {
      tools.register(userData, next)
    },

    pause: (next) => setTimeout(next, 1000),

    installations: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/installations'),
        json: true
      }, tools.wrapResult(next))
    }

  }, (err, results) => {

    if(err) t.error(err)

    const installations = results.installations

    t.equal(installations.body.length, 1, 'there is 1 installation')
    t.equal(installations.body[0].name, 'default', 'it is called default')

    t.end()
  })
})