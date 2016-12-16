import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import AppFactory from 'boiler-frontend/src/factory'
import Passport from 'passport-slim-ui/src/plugin'

import Core from './plugins/core'
import Menus from './plugins/menus'
import Routes from './plugins/routes'
import Installations from './plugins/installations'


const Root = AppFactory([
  Core({
    title:'My Boiler App'
  }),
  Menus(),
  Routes(),
  Passport({
    appURL:'/app'  
  }),
  Installations({
    route:'companies',
    title:'Company',
    pluralTitle:'Companies'
  })
], {
  // cli override settings here
})

ReactDOM.render(
  Root,
  document.getElementById('mount')
)