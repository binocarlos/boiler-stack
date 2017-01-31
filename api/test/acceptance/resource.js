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

      const folder = results
      t.equal(folder.statusCode, 200, '200 code')
      t.equal(folder.body.name, NODE.name, 'resource name')
      
      t.end()
    })

  })
})

tape('acceptance - list resources', (t) => {
  const userData = tools.UserData()

  createSingleResource(userData, (err, base) => {

    tools.listResources(base.installationid, (err, results) => {

      t.equal(results.statusCode, 200, '200 code')
      t.equal(results.body[0].name, NODE.name, 'resource name')
      
      t.end()
    })

  })
})

tape('acceptance - save resource', (t) => {

  const userData = tools.UserData()

  createSingleResource(userData, (err, base) => {

    let resource = base.folder.body
    const resourceid = resource.id
    delete(resource.id)

    resource.meta.height = 20

    tools.saveResource(base.installationid, resourceid, resource, (err, results) => {

      t.equal(results.statusCode, 200, '200 code')
      t.equal(results.body.meta.height, 20, 'resource updated')
      
      t.end()
    })

  })

})

tape('acceptance - delete resource', (t) => {

  const userData = tools.UserData()

  let createresults = null
  let deleteresults = null
  async.waterfall([
    (next) => createSingleResource(userData, next),
    (base, next) => {
      const resource = base.folder.body
      const resourceid = resource.id
      createresults = base
      tools.deleteResource(base.installationid, resourceid, next)
    },
    (results, next) =>  {
      deleteresults = results
      next(null, deleteresults)
    },
    (deleteresults, next) => tools.listResources(createresults.installationid, next)
  ], (err, delresults) => {
    if(err) t.error(err)

    t.equal(delresults.statusCode, 200, '200 code')
    t.equal(delresults.body.length, 0, 'no resources in list')

    t.end()
  })

  
})

