import React, { Component, PropTypes } from 'react'

const DEFAULT_PASSPORT_SETTINGS = {
  loginRoute:'login',
  registerRoute:'register',
  primaryKey:'email',
  includeEmail:true,
  includeUsername:false,
  extraFields:[],
  loginContent:(<div />),
  registerContent:(<div />),
  passportURL:'/auth/v1',
  statusPath:'/status',
  loginPath:'/login',
  registerPath:'/register',
  userFilter:() => true
}

const factory = (settings = {}) => {
  return Object.assign({}, DEFAULT_PASSPORT_SETTINGS, settings)
}

export default factory