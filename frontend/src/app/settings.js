import React, { Component, PropTypes } from 'react'
import PassportBoiler from '../passport-slim-ui/passportboiler'
import GetRoutes from './routes'
import GetUserMenu from './usermenu'

const SettingsFactory = (settings = {}) => {
  const appSettings = PassportBoiler({
    appURL:'/app'
  }, {
    getRoutes:GetRoutes,
    getUserMenu:GetUserMenu
  })
  return appSettings
}

export default SettingsFactory