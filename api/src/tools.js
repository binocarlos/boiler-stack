"use strict";
const crypto = require('crypto')
const hat = require('hat')
const TRACER_KEY = 'x-tracer-id'

const settings = require('./settings')

const littleid = () => hat().substring(0,8)
const getRandomEmail = () => littleid() + '@' + settings.emaildomain
const getRandomPassword = () => littleid()

const ensureRequestTracerId = (req) => {
  let existing = req.headers[TRACER_KEY]
  if(!existing) {
    existing = hat()
    req.headers[TRACER_KEY] = existing
  }
  return existing
}

function makeSalt() {
  return Math.round((new Date().valueOf() * Math.random())) + '';
}

function encryptPassword(password, salt) {
  if (!password) return '';
  try {
    return crypto
      .createHmac('sha1', salt)
      .update(password)
      .digest('hex');
  } catch (err) {
    return '';
  }
}

function checkUserPassword(user, password) {
  const encryptedPassword = encryptPassword(password, user.salt)
  return encryptedPassword == user.hashed_password
}

function generateUser(user) {
  const salt = makeSalt()
  const encryptedPassword = encryptPassword(user.password, salt)
  return {
    email: user.email,
    hashed_password: encryptedPassword,
    salt: salt,
    meta: JSON.stringify(user.meta || {})
  }
}

function errorHandler(err, req, res, next) {
  let code = 500
  let message = ''
  let data = null
  if(err instanceof Error) {
    if(process.env.NODE_ENV != 'production'){
      console.error(err.stack)
    }
    err = err.message
  }
  else if(typeof(err) === 'string') {
    message = err
  }
  else if (err instanceof Array) {
    message = err[0]
    code = err[1]
    data = err[2]
  }
  else if (err instanceof Object) {
    message = err.message
    code = err.code
    data = err.data
  }
  else {
    message = 'unknown error type: ' + typeof(err)
  }
  const errorData = Object.assign({}, data, {
    error: message
  })
  res
    .status(code)
    .json(errorData)
}

const jsonCallback = (res, error, statusCode) => (err, results) => {
  if(err) return error(err)
  statusCode = statusCode || 200
  res.status(statusCode)
  res.json(results)
}

const jobLogger = (logger, tracer, opts) => {
  return (err, data) => {
    if(err) {
      logger.error('job', tracer, Object.assign({}, opts, {error: err.toString()}))
    }
    else {
      logger.info('job', tracer, Object.assign({}, opts, {data}))
    }
  }
}

module.exports = {
  ensureRequestTracerId,
  makeSalt,
  encryptPassword,
  checkUserPassword,
  generateUser,
  errorHandler,
  jsonCallback,
  jobLogger,
  getRandomEmail,
  getRandomPassword
}