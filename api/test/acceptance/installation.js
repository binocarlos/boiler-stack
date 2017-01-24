"use strict";
const tape = require('tape')
const async = require('async')
const tools = require('./tools')

// check that when we register - we get a default installation owned by us
tape('acceptance - installation - default on register', (t) => {
  const userData = tools.UserData()

  async.series({

    register: (next) => {
      tools.register(userData, (err, result) => {
        console.log('-------------------------------------------');
        console.log('-------------------------------------------');
        console.dir(result)
      })
    },

    pause: (next) => setTimeout(next, 100),

    installations: (next) => {
      console.log('-------------------------------------------');
      console.log('-------------------------------------------');
      console.log('here')
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/installations'),
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

    console.log(JSON.stringify(results.installations, null, 4))

    t.end()
  })
})