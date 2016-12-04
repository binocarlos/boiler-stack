import React, { Component, PropTypes } from 'react'

import AppBar from './containers/AppBar'

import Welcome from './components/Welcome'

import STYLES from './styles'

const SETTINGS = {
  middleware:[],
  reducers:{},
  sagas:[],
  appbar:AppBar,
  welcome:Welcome,
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