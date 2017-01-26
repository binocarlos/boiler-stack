"use strict";
const tape = require('tape')
const async = require('async')
const tools = require('./tools')

const headers = tools.headers

tape('acceptance - installations', (t) => {
  const userData = tools.UserData()

  async.series({

    register: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/register'),
        headers: headers(),
        json: userData
      }, tools.wrapResult(next))
    },

    pause: (next) => setTimeout(next, 100),

    installations: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/installations'),
        headers: headers(),
        json: true
      }, tools.wrapResult(next))
    },

    status: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/status'),
        headers: headers(),
        json: true
      }, tools.wrapResult(next))
    }

  }, (err, results) => {

    if(err) t.error(err)

    const register = results.register
    const installations = results.installations
    const status = results.status

    t.equal(installations.body.length, 1, '1 installation')
    t.equal(installations.body[0].name, 'default', 'default installation')

    t.equal(status.body.data.meta.activeInstallation, installations.body[0].id, 'the user the active installation')

    t.end()
  })
})

tape('acceptance - create installation', (t) => {
  const userData = tools.UserData()
  const INSTALLATION_NAME = 'apples install'

  async.series({

    register: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/register'),
        headers: headers(),
        json: userData
      }, tools.wrapResult(next))
    },

    pause: (next) => setTimeout(next, 100),

    create: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/installations'),
        headers: headers(),
        json: {
          name: INSTALLATION_NAME
        }
      }, tools.wrapResult(next))
    },

    installations: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/installations'),
        headers: headers(),
        json: true
      }, tools.wrapResult(next))
    }

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
  let obj = null

  async.series({

    register: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/register'),
        headers: headers(),
        json: userData
      }, tools.wrapResult(next))
    },

    pause: (next) => setTimeout(next, 100),

    create: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/installations'),
        headers: headers(),
        json: {
          name: INSTALLATION_NAME,
          meta: {
            fruit: 'apples'
          }
        }
      }, tools.wrapResult((err, result) => {
        if(err) return next(err)
        obj = result.body
        next(err, result)
      }))
    },

    save: (next) => {
      tools.request({
        method: 'PUT',
        url: tools.url('/api/v1/installations/' + obj.id),
        headers: headers(),
        json: {
          name: INSTALLATION_NAME + '2',
          meta: Object.assign({}, obj.meta, {
            color: 'oranges'
          })
        }
      }, tools.wrapResult(next))
    },

    installation: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/installations/' + obj.id),
        headers: headers(),
        json: true
      }, tools.wrapResult(next))
    }

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

tape('acceptance - delete installation', (t) => {
  const userData = tools.UserData()
  const INSTALLATION_NAME = 'apples install'
  let obj = null

  async.series({

    register: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/register'),
        headers: headers(),
        json: userData
      }, tools.wrapResult(next))
    },

    pause: (next) => setTimeout(next, 100),

    create: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/installations'),
        headers: headers(),
        json: {
          name: INSTALLATION_NAME,
          meta: {
            fruit: 'apples'
          }
        }
      }, tools.wrapResult((err, result) => {
        if(err) return next(err)
        obj = result.body
        next(err, result)
      }))
    },

    del: (next) => {
      tools.request({
        method: 'DELETE',
        url: tools.url('/api/v1/installations/' + obj.id),
        headers: headers()
      }, tools.wrapResult(next))
    },

    installations: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/installations'),
        headers: headers(),
        json: true
      }, tools.wrapResult(next))
    }

  }, (err, results) => {

    if(err) t.error(err)

    const installations = results.installations.body

    t.equal(installations.length, 1, 'only 1 installation')
    t.equal(installations[0].name, 'default', 'the only one is the default')
    t.end()
  })
})