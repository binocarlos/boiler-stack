"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')

const PRIVATE_FIELDS = {
  hashed_password: true,
  salt: true
}

const crud = Crud('useraccount')

// remove sensitive fields
const clean = (data) => {
  return Object.keys(data || {})
    .filter(f => PRIVATE_FIELDS[f] ? false : true)
    .reduce((all, key) => {
      all[key] = data[key]
      return all
    }, {})
}

// login query
// 1. load user with email using crud.get
// 2. encrypt plain text password using loaded salt
// 3. compare both encrypted passwords
// query:
//  * email
//  * password
const login = (runQuery, query, done) => {
  const email = query.email
  const password = query.password
  crud.get(runQuery, { email }, (err, result) => {
    if(err) return done(err)
    if(!result) return done()
    done(null, tools.checkUserPassword(result, password) ? clean(result) : null)
  })
}

// models.user.register - register user transaction
// 1. check the primary key does not exist
// 2. insert
//
// query:
//  * data
const register = (runQuery, query, done) => {
  const data = query.data
  const userData = tools.generateUser(data)
  let newUser = null
  async.waterfall([
    (next) => crud.get(runQuery, { email: data.email }, next),
    (existingUser, next) => {
      if(existingUser) return next(data.email + ' already exists')
      crud.insert(runQuery, userData, next)
    },
    (insertedUser, next) => {
      newUser = insertedUser
      next()
    }
  ], (err) => {
    if(err) return done(err)
    done(null, clean(newUser))
  })
}

// models.user.save - save command
// 1. update 'data' as a JSON string based on params
// query:
//  * data
//  * params
const save = (runQuery, query, done) => {
  const data = query.data
  const params = query.params
  const userData = {data: JSON.stringify(data)}
  crud.update(runQuery, userData, params, done)
}

module.exports = {
  login,
  register,
  save,
  clean
}