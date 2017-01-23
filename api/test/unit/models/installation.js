"use strict";
const tape = require('tape')
const apptools = require('../../../src/tools')
const tools = require('../../../testtools')
const Installation = require('../../../src/models/installation')

const USER_ACCOUNT = {
  email: 'bob@bob.com',
  password: 'apples'
}

tape('models.installation - create', (t) => {
  const DATA = { name: 'apples' }
  const USERID = 5

  const postgres = tools.postgres()
  const eventBus = tools.eventBus()
  
  t.end()

})
