"use strict";
const async = require('async')
const Request = require('request')
const request = Request.defaults({jar: true})

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:80'

const TRACER_ID = '1234'

const headers = () => {
  return {
    'x-tracer-id': TRACER_ID
  }
}

const url = (path) => {
  path = path || ''
  return BASE_URL + path
}

const UserData = (count) => {
  count = count || ''
  const ts = new Date().getTime()
  return {
    email: 'user' + ts + count + '@test.com',
    password: 'apples'
  }
}


const wrapResult = (done) => (err, res, body) => {
  if(err) return done(err)
  done(null, {
    statusCode: res.statusCode,
    body: body
  })
}

const register = (user, next) => {
  request({
    method: 'POST',
    url: url('/api/v1/register'),
    headers: headers(),
    json: user
  }, wrapResult(next))
}

const login = (user, next) => {
  request({
    method: 'POST',
    url: url('/api/v1/login'),
    headers: headers(),
    json: user
  }, wrapResult(next))
}

const logout = (next) => {
  request({
    method: 'GET',
    url: url('/api/v1/logout'),
    headers: headers(),
    followAllRedirects: true
  }, wrapResult(next))
}

const status = (next) => {
  request({
    method: 'GET',
    url: url('/api/v1/status'),
    headers: headers(),
    json: true
  }, wrapResult(next))
}

const installations = (next) => {
  request({
    method: 'GET',
    url: url('/api/v1/installations'),
    headers: headers(),
    json: true
  }, wrapResult(next))
}

const createInstallation = (data, next) => {
  request({
    method: 'POST',
    url: url('/api/v1/installations'),
    headers: headers(),
    json: data
  }, wrapResult(next))
}

const saveInstallation = (id, data, next) => {
  request({
    method: 'PUT',
    url: url('/api/v1/installations/' + id),
    headers: headers(),
    json: data
  }, wrapResult(next))
}

const getInstallation = (id, next) => {
  request({
    method: 'GET',
    url: url('/api/v1/installations/' + id),
    headers: headers(),
    json: true
  }, wrapResult(next))
}

const deleteInstallation = (id, next) => {
  request({
    method: 'DELETE',
    url: url('/api/v1/installations/' + id),
    headers: headers()
  }, wrapResult(next))
}

const activateInstallation = (id, next) => {
  request({
    method: 'PUT',
    url: url('/api/v1/installations/' + id + '/activate'),
    headers: headers()
  }, wrapResult(next))
}

module.exports = {
  UserData,
  request,
  url,
  register,
  wrapResult,
  headers,
  register,
  login,
  logout,
  status,
  installations,
  createInstallation,
  saveInstallation,
  getInstallation,
  deleteInstallation,
  activateInstallation
}