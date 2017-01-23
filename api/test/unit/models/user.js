"use strict";
const tape = require('tape')
const apptools = require('../../../src/tools')
const tools = require('../../../testtools')
const User = require('../../../src/models/user')

const USER_ACCOUNT = {
  email: 'bob@bob.com',
  password: 'apples'
}

const getUser = (postgres, eventBus) => {
  postgres = postgres || tools.postgres()
  eventBus = eventBus || tools.eventBus()
  const connection = tools.connection(postgres)
  return User(connection, eventBus)
}

const login = (password, done) => {
  const userData = apptools.generateUser(USER_ACCOUNT)
  const postgres = tools.postgres()
  postgres.expect({
    sql: 'select * from useraccount where email = $1',
    params: [USER_ACCOUNT.email]
  }, [userData])
  const user = getUser(postgres)
  user.login(USER_ACCOUNT.email, password, done)
}

tape('login with correct details', (t) => {
  login(USER_ACCOUNT.password, (err, user) => {
    if(err) t.error(err)
    t.equal(user.email, USER_ACCOUNT.email, 'user is logged in')
    t.end()
  })
})

tape('login with incorrect details', (t) => {
  login(USER_ACCOUNT.password + 'BAD', (err, user) => {
    if(err) t.error(err)
    t.equal(user, null, 'user is NOTlogged in')
    t.end()
  })
})

tape('register', (t) => {
  const postgres = tools.postgres({
    noParams: true
  })
  const user = getUser(postgres)
  const userData = apptools.generateUser(USER_ACCOUNT)

  postgres.expect({
    sql: 'insert into useraccount ( email, hashed_password, salt, data ) values ( $1, $2, $3, $4 ) returning *'
  }, [userData])

  user.register(USER_ACCOUNT, (err, result) => {
    t.deepEqual(userData, result, 'user objects are equal')
    postgres.check(t, 'register query logs are equal')
    t.end()
  })

})
