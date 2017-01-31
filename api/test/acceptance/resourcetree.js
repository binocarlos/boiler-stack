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

tape('acceptance - delete resource tree', (t) => {
  const userData = tools.UserData()

  createResourceTree(userData, (err, base) => {

    const topfolder = base.folder.body
    const middlefolder = topfolder.children[0]
    const lowerfolder = middlefolder.children[0]

    async.series({
      delete: (next) => tools.deleteResource(base.installationid, middlefolder.id, next),
      list: (next) => tools.listResources(base.installationid, next)
    }, (err, results) => {
      if(err) t.error(err)

      t.equal(results.delete.statusCode, 200, 'delete 200 code')
      t.equal(results.list.statusCode, 200, 'list 200 code')
      t.equal(results.list.body.length, 1, 'only 1 resource left')
      t.equal(results.list.body[0].id, topfolder.id, 'only topfolder resource left')
      
      t.end()
    })

  })
})

tape('acceptance - get children', (t) => {
  const userData = tools.UserData()

  createResourceTree(userData, (err, base) => {

    const topfolder = base.folder.body
    const middlefolder = topfolder.children[0]
    const lowerfolder = middlefolder.children[0]

    async.series({
      root: (next) => tools.resourceChildren(base.installationid, null, next), 
      top: (next) => tools.resourceChildren(base.installationid, topfolder.id, next),
      middle: (next) => tools.resourceChildren(base.installationid, middlefolder.id, next),
      lower: (next) => tools.resourceChildren(base.installationid, lowerfolder.id, next)
    }, (err, results) => {
      if(err) t.error(err)

      const children = {
        root: results.root.body[0],
        top: results.top.body[0],
        middle: results.middle.body[0],
        lower: results.lower.body[0]
      }

      t.equal(children.root.id, topfolder.id, 'root -> top')
      t.equal(children.top.id, middlefolder.id, 'top -> middle')
      t.equal(children.middle.id, lowerfolder.id, 'middle -> lower')
      t.equal(results.lower.body.length, 0, 'no children for lower')

      t.end()
    })

  })
})
