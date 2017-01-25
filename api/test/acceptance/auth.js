"use strict";
const tape = require('tape')
const async = require('async')
const tools = require('./tools')

tape('acceptance - register', (t) => {
  const userData = tools.UserData()

  async.series({

    register: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/register'),
        json: userData
      }, tools.wrapResult(next))
    },

    status: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/status'),
        json: true
      }, tools.wrapResult(next))
    }
  }, (err, results) => {

    if(err) t.error(err)

    const register = results.register
    const status = results.status

    const EXPECTED_STATUS = {
      register: 201
    }

    const EXPECTED_BODY = {
      register: { registered: true },
      status: { loggedIn: true }
    }

    Object.keys(results).forEach((key) => {
      const result = results[key]
      const expectedStatus = EXPECTED_STATUS[key] || 200
      t.equal(result.statusCode, expectedStatus, key + ' = ' + expectedStatus + ' status')
    })

    Object.keys(EXPECTED_BODY).forEach((key) => {
      const result = results[key]
      const expected = EXPECTED_BODY[key]

      Object.keys(expected).forEach((field) => {
        t.equal(result.body[field], expected[field], key + ' - body - ' + field + ' = ' + expected[field])
      })
    })

    t.equal(register.body.data.email, userData.email, 'register email is correct')
    t.equal(status.body.data.email, userData.email, 'status email is correct')

    t.equal(register.body.data.hashed_password, undefined, 'no password deets')
    t.equal(status.body.data.hashed_password, undefined, 'no password deets')

    t.end()
  })
})

tape('acceptance - status', (t) => {
  const userData = tools.UserData()

  async.series({

    register: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/register'),
        json: userData
      }, tools.wrapResult(next))
    },

    status: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/status'),
        json: true
      }, tools.wrapResult(next))
    },

    logout: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/logout'),
        followAllRedirects: true
      }, tools.wrapResult(next))
    },

    nostatus: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/status'),
        json: true
      }, tools.wrapResult(next))
    },

    login: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/login'),
        json: userData
      }, tools.wrapResult(next))
    },

    loginstatus: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/status'),
        json: true
      }, tools.wrapResult(next))
    }

  }, (err, results) => {

    if(err) t.error(err)


    const register = results.register
    const status = results.status

    const EXPECTED_STATUS = {
      register: 201
    }

    const EXPECTED_BODY = {
      register: { registered: true },
      status: { loggedIn: true },
      nostatus: { loggedIn: false },
      login: { loggedIn: true },
      loginstatus: { loggedIn: true },
    }

    Object.keys(results).forEach((key) => {
      const result = results[key]
      const expectedStatus = EXPECTED_STATUS[key] || 200
      t.equal(result.statusCode, expectedStatus, key + ' = ' + expectedStatus + ' status')
    })

    Object.keys(EXPECTED_BODY).forEach((key) => {
      const result = results[key]
      const expected = EXPECTED_BODY[key]

      Object.keys(expected).forEach((field) => {
        t.equal(result.body[field], expected[field], key + ' - body - ' + field + ' = ' + expected[field])
      })
    })

    t.end()
  })
})


tape('acceptance - installations', (t) => {
  const userData = tools.UserData()

  async.series({

    register: (next) => {
      tools.request({
        method: 'POST',
        url: tools.url('/api/v1/register'),
        json: userData
      }, tools.wrapResult(next))
    },

    installations: (next) => {
      tools.request({
        method: 'GET',
        url: tools.url('/api/v1/installations'),
        json: true
      }, tools.wrapResult(next))
    }

  }, (err, results) => {

    if(err) t.error(err)

    const register = results.register
    const installations = results.installations

    t.equal(installations.body.length, 1, '1 installation')
    t.equal(installations.body[0].name, 'default', 'default installation')

    t.end()
  })
})