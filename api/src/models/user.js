"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')

const getCrud = (client) => Crud(client, 'useraccount')

// login query
// 1. load user with email using crud.get
// 2. encrypt plain text password using loaded salt
// 3. compare both encrypted passwords
const login = (client, eventBus) => (email, password, done) => {
  const crud = getCrud(client)
  crud.get({ email }, (err, result) => {
    if(err) return done(err)
    if(!result) return done()
    done(null, tools.checkUserPassword(result, password) ? result : null)
  })
}

// models.user.register - register user transaction
// 1. check the primary key does not exist
// 2. insert
const register = (client, eventBus) => (data, done) => {
  const userData = tools.generateUser(data)
  let newUser = null
  const crud = getCrud(client)
  async.waterfall([
    (next) => crud.get({ email: data.email }, next),
    (existingUser, next) => {
      if(existingUser) return next(data.email + ' already exists')
      crud.insert(userData, next)
    },
    (insertedUser, next) => {
      newUser = insertedUser
      next()
    }
  ], (err) => {
    if(err) return done(err)
    eventBus.emit('models.user.register', {
      query: { data },
      result: newUser
    })
    done(null, newUser)
  })
}

// models.user.save - save command
// 1. update 'data' as a JSON string based on params
const save = (client, eventBus) => (data, params, done) => {
  const userData = {data: JSON.stringify(data)}
  const crud = getCrud(client)
  crud.update(userData, params, (err, result) => {
    if(err) return done(err)
    eventBus.emit('models.user.save', {
      query: { data, params },
      result
    })
    done(null, result)
  })
}

module.exports = {
  login,
  register,
  save
}