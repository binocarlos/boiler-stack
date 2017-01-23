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
  const eventBus = tools.eventBus()
  const user = getUser(postgres, eventBus)
  const userData = apptools.generateUser(USER_ACCOUNT)

  postgres.expect({
    sql: 'insert into useraccount ( email, hashed_password, salt, data ) values ( $1, $2, $3, $4 ) returning *'
  }, [userData])

  user.register(USER_ACCOUNT, (err, result) => {
    if(err) t.error(err)
    t.deepEqual(userData, result, 'user objects are equal')
    postgres.check(t, 'register query logs are equal')
    t.deepEqual(eventBus.getState(), {
      events: [{
        channel: 'models.user.register',
        message: {
          query: {
            data: USER_ACCOUNT
          },
          result: userData
        }
      }]
    })
    t.end()
  })

})

tape('save', (t) => {
  const DATA = { color: 'red' }
  const PARAMS = { id: 3 }
    
  const postgres = tools.postgres()
  const user = getUser(postgres)
  
  postgres.expect({
    sql: 'update useraccount set data = $1 where id = $2 returning *',
    params: [ JSON.stringify(DATA), PARAMS.id ]
  }, [{
    id: PARAMS.id,
    data: DATA
  }])

  user.save(DATA, PARAMS, (err, result) => {
    if(err) t.error(err)
    t.deepEqual(result, {
      id: PARAMS.id,
      data: DATA
    })
    postgres.check(t, 'save query logs are equal')
    t.end()
  })

})
