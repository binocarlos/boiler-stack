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

const createResourceTree = (userData, done) => {
  register(userData, (err, base) => {
    if(err) t.error(err)
    tools.createResource(base.installationid, TREE, (err, results) => {
      if(err) return done(err)
      done(null, Object.assign({}, base, {
        folder: results
      }))
    })
  })
}

tape('acceptance - create resource tree', (t) => {
  const userData = tools.UserData()

  createResourceTree(userData, (err, base) => {

    const topfolder = base.folder.body
    const middlefolder = topfolder.children[0]
    const lowerfolder = middlefolder.children[0]

    t.equal(topfolder.type, 'folder', 'top is folder')
    t.equal(middlefolder.type, 'folder', 'top is folder')
    t.equal(lowerfolder.type, 'folder', 'top is folder')

    t.equal(topfolder.parent, null, 'top has no parent')
    t.equal(middlefolder.parent, topfolder.id, 'top is middle parent')
    t.equal(lowerfolder.parent, middlefolder.id, 'middle is lower parent')

    t.equal(topfolder.path, 'root', 'top has root path')
    t.equal(middlefolder.path, topfolder.path + '.' + topfolder.id, 'middle path')
    t.equal(lowerfolder.path, middlefolder.path + '.' + middlefolder.id, 'lowerpath')

    t.equal(topfolder.meta.price, 10, 'top price is correct')

    t.end()
  })
})
