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

  postgres.expect('BEGIN')
  postgres.expect(EMAIL_QUERY, [])
  postgres.expect({
    sql: 'insert into useraccount ( email, hashed_password, salt, data ) values ( $1, $2, $3, $4 ) returning *'
  }, [userData])
  postgres.expect('COMMIT')
  
  t.end()

})
