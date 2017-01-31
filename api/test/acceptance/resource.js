"use strict";
const tape = require('tape')
const async = require('async')
const tools = require('./tools')
const FIXTURES = require('./fixtures.json')
const NODE = FIXTURES.resourceNode
const TREE = FIXTURES.resourceTree
const headers = tools.headers

const register = (userData, done) => {
  if(!done) {
    done = userData
    userData = tools.UserData() 
  }
  let user = null

  async.series({
    user: (next) => tools.register(userData, next)
  }, (err, results) => {
    if(err) t.error(err)

    const user = results.user.body.data
    const installationid = user.meta.activeInstallation 
    
    done(null, {
      user,
      installationid
    })

  })
}

const createSingleResource = (userData, done) => {
  register(userData, (err, base) => {
    if(err) t.error(err)
    tools.createResource(base.installationid, NODE, (err, results) => {
      if(err) return done(err)
      done(null, Object.assign({}, base, {
        folder: results
      }))
    })
  })
}

tape('acceptance - create resource', (t) => {
  const userData = tools.UserData()

  createSingleResource(userData, (err, base) => {

    const folder = base.folder
    t.equal(folder.statusCode, 201, '201 code')
    t.equal(folder.body.name, NODE.name, 'resource name')

    t.end()
  })
})

tape('acceptance - get resource', (t) => {
  const userData = tools.UserData()

  createSingleResource(userData, (err, base) => {

    tools.getResource(base.installationid, base.folder.body.id, (err, results) => {
      console.log(JSON.stringify(results, null, 4))
      t.end()
    })

  })
})
