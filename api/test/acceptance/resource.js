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

tape('acceptance - resources', (t) => {
  const userData = tools.UserData()

  register(userData, (err, base) => {
    if(err) t.error(err)
    tools.createResource(base.installationid, NODE, (err, results) => {
      if(err) t.error(err)

      const folder = results.body
      
      t.equal(results.statusCode, 201, '201 code')
      t.equal(folder.name, NODE.name, 'resource name')

      t.end()
    })
    
  })

})
