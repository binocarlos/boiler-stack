"use strict";
const tape = require('tape')
const apptools = require('../../../src/tools')
const tools = require('../../../testtools')
const User = require('../../../src/models/user')

const USER_ACCOUNT = {
  email: 'bob@bob.com',
  password: 'apples'
}

const EMAIL_QUERY = {
  sql: 'select * from useraccount where email = $1',
  params: [USER_ACCOUNT.email]
}

const runTest = (postgres, handler, done) => {
  const connection = tools.connection(postgres)
  connection((client, finish) => {
    handler(client, finish)
  }, done)
}

const login = (password, done) => {
  const userData = apptools.generateUser(USER_ACCOUNT)
  const postgres = tools.postgres()
  postgres.expect(EMAIL_QUERY, [userData])
  runTest(postgres, (client, finish) => {
    const login = User.login(client)
    login(USER_ACCOUNT.email, password, finish)
  }, done)
}

tape('models.user - login with correct details', (t) => {
  login(USER_ACCOUNT.password, (err, user) => {
    if(err) t.error(err)
    t.equal(user.email, USER_ACCOUNT.email, 'user is logged in')
    t.end()
  })
})

tape('models.user - login with incorrect details', (t) => {
  login(USER_ACCOUNT.password + 'BAD', (err, user) => {
    if(err) t.error(err)
    t.equal(user, null, 'user is NOTlogged in')
    t.end()
  })
})

tape('models.user - register', (t) => {
  const postgres = tools.postgres({
    noParams: true
  })
  const userData = apptools.generateUser(USER_ACCOUNT)

  postgres.expect(EMAIL_QUERY, [])
  postgres.expect({
    sql: 'insert into useraccount ( email, hashed_password, salt, data ) values ( $1, $2, $3, $4 ) returning *'
  }, [userData])

  runTest(postgres, (client, finish) => {
    const register = User.register(client)
    register(USER_ACCOUNT, (err, result) => {
      if(err) t.error(err)
      t.deepEqual(userData, result, 'user objects are equal')
      postgres.check(t, 'register query logs are equal')
      
      finish()
    })
  }, () => {
    t.end()
  })
})

tape('models.user - save', (t) => {
  const DATA = { color: 'red' }
  const PARAMS = { id: 3 }
  const RESULT = {
    id: PARAMS.id,
    data: DATA
  }
  const postgres = tools.postgres()
  
  postgres.expect({
    sql: 'update useraccount set data = $1 where id = $2 returning *',
    params: [ JSON.stringify(DATA), PARAMS.id ]
  }, [{
    id: PARAMS.id,
    data: DATA
  }])

  runTest(postgres, (client, finish) => {
    const save = User.save(client)
    save(DATA, PARAMS, (err, result) => {
      if(err) t.error(err)
      t.deepEqual(result, RESULT)
      postgres.check(t, 'save query logs are equal')
      finish()
    })
  }, () => {
    t.end()
  })
})