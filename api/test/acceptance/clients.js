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

  tools.register(userData, (err, user) => {

    const installationid = user.body.data.meta.activeInstallation

    async.series({
      addclient: (next) => tools.createClient(installationid, CLIENTDATA, next),
      clients: (next) => tools.listClients(installationid, next)

    }, (err, results) => {

      if(err) t.error(err)

      console.log(JSON.stringify(results, null, 4))
      
      t.end()
    })
  })
  
})
