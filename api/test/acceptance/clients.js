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

tape('acceptance - create client', (t) => {

  createClient((err, results) => {
    if(err) t.error(err)

    t.equal(results.client.statusCode, 201, 'create 201 status')
    t.equal(results.client.body.meta.name, CLIENTDATA.meta.name, 'client name is correct')

    t.end()

  })
  
})

tape('acceptance - list clients - no installation id', (t) => {

  async.waterfall([
    createClient,
    (results, next) => tools.listClients(null, next)
  ], (err, results) => {
    if(err) t.error(err)

    t.equal(results.statusCode, 403, '403 status no installation id')
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


tape('acceptance - save client - no installation id', (t) => {

  async.waterfall([
    createClient,
    (results, next) => {
      const client = results.client.body
      const clientid = client.id
      delete(client.id)

      client.email = 'bob@bob123.com'
      client.meta.fruit = 'oranges'

      tools.saveClient(null, clientid, client, next)
    }
  ], (err, results) => {
    if(err) t.error(err)

    t.equal(results.statusCode, 403, '403 status no installation id')

    t.end()
  })

  
})

tape('acceptance - save client', (t) => {

  async.waterfall([
    createClient,
    (results, next) => {
      const client = results.client.body
      const clientid = client.id
      delete(client.id)

      client.email = 'SAVED' + client.email
      client.meta.fruit = 'oranges'

      tools.saveClient(results.installationid, clientid, client, next)
    }
  ], (err, results) => {
    if(err) t.error(err)

    const client = results.body
    t.equal(client.email.indexOf('SAVED'), 0, 'saved email')
    t.equal(client.meta.fruit, 'oranges', 'saved meta')

    t.end()
  })

  
})