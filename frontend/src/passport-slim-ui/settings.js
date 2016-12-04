import React, { Component, PropTypes } from 'react'

import LoginMessage from './components/LoginMessage'
import RegisterMessage from './components/RegisterMessage'
import UserWelcome from './components/UserWelcome'

const DEFAULT_PASSPORT_SETTINGS = {
  loginRoute:'login',
  registerRoute:'register',
  primaryKey:'email',
  includeEmail:true,
  includeUsername:false,
  extraFields:[],
  loginContent:LoginMessage,
  registerContent:RegisterMessage,
  passportURL:'/auth/v1',
  statusPath:'/status',
  loginPath:'/login',
  registerPath:'/register',
  userFilter:() => true
}

const DEFAULT_APP_SETTINGS = {
  welcome:UserWelcome
}

const factory = (settings = {}) => {
  return Object.assign({}, DEFAULT_PASSPORT_SETTINGS, settings)
}

export const AppSettings = (settings = {}) => {
  return Object.assign({}, DEFAULT_APP_SETTINGS, settings)
}

export default factory