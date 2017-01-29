"use strict";
const tape = require('tape')
const async = require('async')
const tools = require('./tools')

const headers = tools.headers
const CLIENTDATA = {
  name: 'bob the client'
}

tape('acceptance - clients', (t) => {
  const userData = tools.UserData()
  let user = null

  async.series({

    register: (next) => tools.register(userData, (err, u) => {
      if(err) return next(err)
      user = u
    console.log('-------------------------------------------');
    console.dir(user)
      next()
    })/*,
    addclient: (next) => tools.createClient(CLIENTDATA, next),
    clients: (next) => tools.clients(next)*/

  }, (err, results) => {

    if(err) t.error(err)

    console.log(JSON.stringify(results, null, 4))
    
    t.end()
  })
})
