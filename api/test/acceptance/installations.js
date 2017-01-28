"use strict";
const tape = require('tape')
const async = require('async')
const tools = require('./tools')

const headers = tools.headers

tape('acceptance - installations', (t) => {
  const userData = tools.UserData()

  async.series({

    register: (next) => tools.register(userData, next),
    pause: (next) => setTimeout(next, 100),
    installations: (next) => tools.installations(next),
    status: (next) => tools.status(next)

  }, (err, results) => {

    if(err) t.error(err)

    const register = results.register
    const installations = results.installations
    const status = results.status

    t.equal(installations.body.length, 1, '1 installation')
    t.equal(installations.body[0].name, 'My First Company', 'default installation')

    t.equal(status.body.data.meta.activeInstallation, installations.body[0].id, 'the user the active installation')

    t.end()
  })
})

tape('acceptance - create installation', (t) => {
  const userData = tools.UserData()
  const INSTALLATION_NAME = 'apples install'
  const DATA = {
    name: INSTALLATION_NAME
  }
  async.series({

    register: (next) => tools.register(userData, next),
    pause: (next) => setTimeout(next, 100),
    create: (next) => tools.createInstallation(DATA, next),
    installations: (next) => tools.installations(next)

  }, (err, results) => {

    if(err) t.error(err)

    const installations = results.installations.body

    const createdInstallation = installations.filter(i => i.name == INSTALLATION_NAME)

    t.equal(createdInstallation.length, 1, 'the installation was created')

    t.end()
  })
})

tape('acceptance - save installation', (t) => {
  const userData = tools.UserData()
  const INSTALLATION_NAME = 'apples install'
  const DATA = {
    name: INSTALLATION_NAME,
    meta: {
      fruit: 'apples'
    }
  }
  const SAVE_DATA = (obj) => {
    return {
      name: INSTALLATION_NAME + '2',
      meta: Object.assign({}, obj.meta, {
        color: 'oranges'
      })
    }
  }
  let obj = null

  async.series({

    register: (next) => tools.register(userData, next),
    pause: (next) => setTimeout(next, 100),
    create: (next) => tools.createInstallation(DATA, (err, r) => {
      if(err) return next(err)
      obj = r.body
      next()
    }),
    save: (next) => tools.saveInstallation(obj.id, SAVE_DATA(obj), next),
    installation: (next) => tools.getInstallation(obj.id, next)

  }, (err, results) => {

    if(err) t.error(err)

    const installation = results.installation.body

    t.equal(installation.id, obj.id, 'id sanity')
    t.deepEqual(installation.meta, {
      fruit: 'apples',
      color: 'oranges'
    }, 'merged meta-data')
    t.end()
  })
})
/*
tape('acceptance - delete installation', (t) => {
  const userData = tools.UserData()
  const INSTALLATION_NAME = 'apples install'
  const DATA = {
    name: INSTALLATION_NAME,
    meta: {
      fruit: 'apples'
    }
  }
  let obj = null

  async.series({

    register: (next) => tools.register(userData, next),

    pause: (next) => setTimeout(next, 100),

    create: (next) => tools.createInstallation(DATA, (err, r) => {
      if(err) return next(err)
      obj = r.body
      next()
    }),

    del: (next) => tools.deleteInstallation(obj.id, next),
    installations: (next) => tools.installations(next)

  }, (err, results) => {

    if(err) t.error(err)

    const installations = results.installations.body

    t.equal(installations.length, 1, 'only 1 installation')
    t.equal(installations[0].name, 'default', 'the only one is the default')
    t.end()
  })
})

tape('acceptance - activate installation', (t) => {
  const userData = tools.UserData()
  const INSTALLATION_NAME = 'apples install'
  let obj = null
  const DATA = {
    name: INSTALLATION_NAME,
    meta: {
      fruit: 'apples'
    }
  }
  async.series({

    register: (next) => tools.register(userData, next),

    pause: (next) => setTimeout(next, 100),

    create: (next) => tools.createInstallation(DATA, (err, r) => {
      if(err) return next(err)
      obj = r.body
      next()
    }),

    activate: (next) => tools.activateInstallation(obj.id, next),
    status: (next) => tools.status(next)

  }, (err, results) => {

    if(err) t.error(err)

    t.equal(parseInt(results.status.body.data.meta.activeInstallation), obj.id, 'active installation is correct')
    
    t.end()
  })
})*/