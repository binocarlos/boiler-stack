import React, { Component, PropTypes } from 'react'

import sections from './sections'
import menus from './menus'
import routes from './routes'

const CORE = {
  title:'Boiler App',
  appURL:'/app',
  currentUserURL:'/api/v1/currentuser'
}

const config = {
  core:CORE,
  menus,
  routes,
  sections,
  // this lets us create plugins using code
  getPlugins:() => []
}

const configFactory = (opts = {}) => {
  return config
}

export default configFactory