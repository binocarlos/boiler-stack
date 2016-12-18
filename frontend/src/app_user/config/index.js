import React, { Component, PropTypes } from 'react'

import settings from './settings'
import menus from './menus'
import routes from './routes'

const mongocrud = (settings = {}) => {
  return {
    type:'mongocrud',
    settings:{
      url:settings.url,
      type:settings.type,
      title:settings.title
    }
  }
}

const sections = [{
  settings:settings.installation,
  api:mongocrud(settings.installation),
  plugin:{
    type:'crud',
    settings:settings.installation
  }
}]

const config = {
  settings,
  core:settings.core,
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