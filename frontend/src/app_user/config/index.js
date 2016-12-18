import React, { Component, PropTypes } from 'react'

import core from './core'
import menus from './menus'
import routes from './routes'
import sections from './sections'

const config = {
  core,
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