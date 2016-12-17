import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import AppFactory from 'boiler-frontend/src/factory'

import Passport from 'passport-slim-ui/src/plugin'
import Snackbar from 'boiler-frontend/src/plugins/snackbar'

import { open_snackbar } from 'boiler-frontend/src/actions'

import Core from './plugins/core'
import Menus from './plugins/menus'
import Routes from './plugins/routes'

import InstallationApi from './api/installations'
import InstallationPlugin from './plugins/installations'

const userEventHandler = (store, userEvent) => {
  logger('user event', userEvent)
  if(userEvent.snackbar) store.dispatch(open_snackbar(userEvent.message))
}

const installationApi = InstallationApi({
  title:'Company'
})

const installationPlugin = InstallationPlugin({
  api:installationApi,
  route:'companies',
  title:'Company',
  pluralTitle:'Companies',
  userEventHandler
})

const Root = AppFactory([
  Core({
    title:'My Boiler App'
  }),
  Menus(),
  Routes(),
  Snackbar(),
  Passport({
    appURL:'/app'  
  }),
  installationPlugin
], {
  // cli override settings here
})

ReactDOM.render(
  Root,
  document.getElementById('mount')
)