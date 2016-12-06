import React, { Component, PropTypes } from 'react'

import AppBar from './containers/AppBar'

import STYLES from './styles'

const SETTINGS = {
  middleware:[],
  reducers:{},
  sagas:[],
  appbar:AppBar,
  getUser:(state) => null,
  getRoutes:(store, settings) => [],
  getMenu:(store, settings) => null,
  getUserMenu:(store, settings) => [],
  getTitle:(state, user) => 'MyApp',
  isReady:() => true
}

// merge the settings with the defaults
const SettingsFactory = (settings = {}, defaultSettings = {}) => {
  return Object.assign({}, SETTINGS, defaultSettings, settings)
}

export default SettingsFactory