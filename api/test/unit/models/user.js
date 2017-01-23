"use strict";
const tape = require('tape')
const apptools = require('../../../src/tools')
const tools = require('../../../testtools')
const User = require('../../../src/models/user')

const USER_ACCOUNT = {
  email: 'bob@bob.com',
  password: 'apples'
}

const getUser = (postgres) => {
  postgres = postgres || tools.postgres()
  const connection = tools.connection(postgres)
  return User(connection)
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