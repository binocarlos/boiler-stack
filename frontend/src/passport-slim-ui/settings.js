import React, { Component, PropTypes } from 'react'

import LoginMessage from './components/LoginMessage'
import RegisterMessage from './components/RegisterMessage'
import UserWelcome from './components/UserWelcome'

const passportURL = '/auth/v1'
const PATHS = {
  status:'/status',
  login:'/login',
  logout:'/logout',
  register:'/register'
}

const DEFAULT_PASSPORT_SETTINGS = {
  loginRoute:'login',
  registerRoute:'register',
  primaryKey:'email',
  includeEmail:true,
  includeUsername:false,
  extraFields:[],
  loginContent:LoginMessage,
  registerContent:RegisterMessage,
  appURL:'/',
  passportURL,
  statusPath:PATHS.status,
  loginPath:PATHS.login,
  logoutPath:PATHS.logout,
  registerPath:PATHS.register,
  userFilter:() => true
}

const DEFAULT_APP_SETTINGS = {
  welcome:UserWelcome
}

const factory = (settings = {}) => {
  let ret = Object.assign({}, DEFAULT_PASSPORT_SETTINGS, settings)
  ret.fullLogoutPath = ret.passportURL + ret.logoutPath + '?redirect=' + ret.appURL
  return ret
}

export const AppSettings = (settings = {}) => {
  return Object.assign({}, DEFAULT_APP_SETTINGS, settings)
}

export default factory