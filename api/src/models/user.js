"use strict";

const async = require('async')
const tools = require('../tools')
const Crud = require('../database/crud')

const getCrud = () => Crud('useraccount')

// login query
// 1. load user with email using crud.get
// 2. encrypt plain text password using loaded salt
// 3. compare both encrypted passwords
const login = (runQuery) => (email, password, done) => {
  const crud = getCrud()
  crud.get(runQuery, { email }, (err, result) => {
    if(err) return done(err)
    if(!result) return done()
    done(null, tools.checkUserPassword(result, password) ? result : null)
  })
}

// models.user.register - register user transaction
// 1. check the primary key does not exist
// 2. insert
const register = (runQuery) => (data, done) => {
  const crud = getCrud()
  const userData = tools.generateUser(data)
  let newUser = null
  async.waterfall([
    (next) => crud.get(runQuery, { email: data.email }, next),
    (existingUser, next) => {
      if(existingUser) return next(data.email + ' already exists')
      crud.insert(runQuery, userData, next)
    },
    (insertedUser, next) => {
      console.log('-------------------------------------------');
      console.log('-------------------------------------------');
      console.log('inserted')
      console.dir(insertedUser)
      newUser = insertedUser
      next()
    }
  ], (err) => {
    if(err) return done(err)
    console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.dir(newUser)
    done(null, newUser)
  })
}

// models.user.save - save command
// 1. update 'data' as a JSON string based on params
const save = (runQuery) => (data, params, done) => {
  const crud = getCrud()
  const userData = {data: JSON.stringify(data)}
  crud.update(runQuery, userData, params, done)
}

module.exports = {
  login,
  register,
  save
}