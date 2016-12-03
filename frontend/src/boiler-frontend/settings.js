import React, { Component, PropTypes } from 'react'

import AppBar from './containers/AppBar'

import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'
import Help from './components/Help'

import STYLES from './styles'

const SETTINGS = {
  middleware:[],
  reducers:{},
  sagas:[],
  appbar:AppBar,
  welcome:Welcome,
  dashboard:Dashboard,
  help:Help,
  getUser:(state) => null,
  getRoutes:(auth) => [],
  getTitle:(state, user) => 'MyApp',
  getMenu:null
}

// merge the settings with the defaults
const SettingsFactory = (settings = {}, defaultSettings = {}) => {
  return Object.assign({}, SETTINGS, defaultSettings, settings)
}

export default SettingsFactory