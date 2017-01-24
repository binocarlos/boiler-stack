"use strict";
const tape = require('tape')
const tools = require('../../../testtools')
const UserController = require('../../../src/controllers/user')

const USER_MODEL = {
  login: () => (email, password, done) => done(),
  register: () => (data, done) => done(null, data),
  save: () => (data, params, done) => done(null, data)
}

const queryStub = (handler, done) => handler({}, done)
const connection = {
  query: queryStub,
  transaction: queryStub
}

tape('controller.user - register', (t) => {
  const USER_DATA = {
    name: 'bob'
  }

  const eventBus = tools.eventBus()
  const controller = UserController(connection, eventBus, USER_MODEL)  

  controller.register(USER_DATA, (err, result) => {
    t.deepEqual(result, USER_DATA, 'the returned data is correct')
    t.deepEqual(eventBus.getState(), {
      events: [{
        channel: 'user.register',
        message: {
          query: {
            data: USER_DATA
          },
          result
        }
      }]
    }, 'the models.user.register event was emitted')

    t.end()
  })
})

tape('controller.user - save', (t) => {
  const USER_DATA = {
    name: 'bob'
  }
  const PARAMS = { id: 3 }

  const eventBus = tools.eventBus()
  const controller = UserController(connection, eventBus, USER_MODEL)  

  controller.save(USER_DATA, PARAMS, (err, result) => {
    t.deepEqual(result, USER_DATA, 'the returned data is correct')
    t.deepEqual(eventBus.getState(), {
      events: [{
        channel: 'user.save',
        message: {
          query: {
            data: USER_DATA,
            params: PARAMS
          },
          result
        }
      }]
    }, 'the models.user.register event was emitted')

    t.end()
  })
})
