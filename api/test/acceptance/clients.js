"use strict";
const tape = require('tape')
const async = require('async')
const tools = require('./tools')

const headers = tools.headers
const CLIENTDATA = {
  meta: {
    name: 'bob the client'  
  }
}

tape('acceptance - default client data', (t) => {

  const userData = tools.UserData()
  let user = null

  async.series({
    user: (nextp) => tools.register(userData, nextp),
    client: (nextp) => tools.newClientData(nextp)
  }, (err, results) => {
    const data = results.client.body
    t.ok(data.email.indexOf('@') > 0, 'we have a client email')
    t.equal(typeof(data.password), 'string', 'default password is string')
    t.ok(data.password.length > 6, 'default password > 6 chars')
    t.end()
  })
  
})

const createClient = (done) => {
  const userData = tools.UserData()
  let user = null

  async.series({
    user: (next) => tools.register(userData, next),
    clientData: (next) => tools.newClientData(next)
  }, (err, results) => {
    if(err) t.error(err)

    const user = results.user.body.data
    const installationid = user.meta.activeInstallation 
    const clientData = Object.assign({}, results.clientData.body, CLIENTDATA)

    tools.createClient(installationid, clientData, (err, client) => {
      if(err) return done(err)
      done(null, Object.assign({}, results, {
        client,
        installationid
      }))
    })
  })
}

tape('acceptance - create client', (t) => {

  createClient((err, results) => {
    if(err) t.error(err)

    t.equal(results.client.statusCode, 201, 'create 201 status')
    t.equal(results.client.body.meta.name, CLIENTDATA.meta.name, 'client name is correct')

    t.end()

  })
  
})

tape('acceptance - list clients', (t) => {

  async.waterfall([
    createClient,
    (results, next) => tools.listClients(results.installationid, next)
  ], (err, results) => {
    if(err) t.error(err)

    const clients = results.body

    t.equal(results.statusCode, 200, '200 status')
    t.ok(clients.length, 'result is array of 1')
    t.ok(clients[0].email.indexOf('@') > 0, 'the client has an email')
    t.equal(clients[0].meta.name, CLIENTDATA.meta.name, 'client name is correct')
    t.end()
  })

  
})

/*
tape('acceptance - create client', (t) => {
  const userData = tools.UserData()
  let user = null

  async.series({
    user: (nextp) => tools.register(userData, nextp),
    client: (nextp) => tools.newClientData(nextp)
  }, (err, data) => {
    if(err) t.error(err)

    const user = data.user.body.data
    const installationid = user.meta.activeInstallation 
    const clientData = Object.assign({}, data.client.body, CLIENTDATA)

    async.series({

      addclient: (next) => tools.createClient(installationid, clientData, next),
      clients: (next) => tools.listClients(installationid, next)

    }, (err, results) => {

      if(err) t.error(err)

      const clients = results.clients.body

      console.log(JSON.stringify(clients, null, 4))

      console.log(clients.length)

      t.end()
    })

  })

})*/
