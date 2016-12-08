import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import AppFactory from '../boiler-frontend/factory'

import Core from './plugins/core'
import Menus from './plugins/menus'
import Routes from './plugins/routes'
import Passport from '../passport-slim-ui/plugin'

const Root = AppFactory([
  Core({
    title:'My Boiler App'
  }),
  Menus(),
  Routes(),
  Passport({
    appURL:'/app'  
  })
], {
  // cli override settings here
})

ReactDOM.render(
  Root,
  document.getElementById('mount')
)