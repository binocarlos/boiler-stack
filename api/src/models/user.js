"use strict";

const async = require('async')
const tools = require('../tools')
const SQL = require('../database/sql')
const selectors = require('../database/selectors')

const PRIVATE_FIELDS = {
  hashed_password: true,
  salt: true
}

const QUERIES = {
  get: (params) => SQL.select('useraccount', params),
  insert: (data) => SQL.insert('useraccount', data),
  update: (data, params) => SQL.update('useraccount', data, params),
  delete: (params) => SQL.delete('useraccount', params),
}

// remove sensitive fields
const cleanData = (data) => {
  return Object.keys(data || {})
    .filter(f => PRIVATE_FIELDS[f] ? false : true)
    .reduce((all, key) => {
      all[key] = data[key]
      return all
    }, {})
}

const prepareData = (user) => {
  const meta = user.meta || {}
  return Object.assign({}, user, {
    meta: JSON.stringify(meta)
  })
}

const get = (runQuery, params, done) => runQuery(QUERIES.get(params), selectors.single(done))
const getClean = (runQuery, params, done) => get(runQuery, params, (err, user) => {
  if(err) return done(err)
  done(null, cleanData(user))
})
const insert = (runQuery, data, done) => runQuery(QUERIES.insert(data), selectors.single(done))
const update = (runQuery, data, params, done) => runQuery(QUERIES.update(data, params), selectors.single(done))
const del = (runQuery, params, done) => runQuery(QUERIES.delete(params), selectors.single(done))

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

  get(runQuery, {email}, (err, user) => {
    if(err) return done(err)
    if(!user) return done()
    done(null, tools.checkUserPassword(user, password) ? cleanData(user) : null)
  })
}

// models.user.register - register user transaction
// 1. check the primary key does not exist
// 2. insert
// query:
//  * data
const register = (runQuery, query, done) => {
  const data = query.data
  const userData = tools.generateUser(data)
  async.waterfall([
    (next) => get(runQuery, { email: data.email }, next),
    (existingUser, next) => {
      if(existingUser) return next(data.email + ' already exists')
      insert(runQuery, userData, next)
    }
  ], (err, newUser) => {
    if(err) return done(err)
    done(null, cleanData(newUser))
  })
}

//  * data
//    * email
//    * meta
//  * params
const save = (runQuery, query, done) => update(runQuery, prepareData(query.data), query.params, done)

module.exports = {
  login,
  register,
  save,
  get: get,
  delete: del,
  getClean: getClean,
  clean: cleanData
}