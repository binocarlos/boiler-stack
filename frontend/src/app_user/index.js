import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import bows from 'bows'
import AppFactory from 'boiler-frontend/src/factory'

import Passport from 'passport-slim-ui/src/plugin'
import Snackbar from 'boiler-frontend/src/plugins/snackbar'

import { open_snackbar } from 'boiler-frontend/src/actions'

import Core from './plugins/core'
import Menus from './plugins/menus'
import Routes from './plugins/routes'

import InstallationApi from './api/installations'
import Installations from './plugins/installations'
import InstallationMenu from './plugins/installationmenu'

const userEventHandler = (section) => {
  const logger = bows(section + ':events')
  return (store, userEvent) => {
    logger('user event', userEvent)
    if(userEvent.snackbar) store.dispatch(open_snackbar(userEvent.message))
  }
}

const apis = {
  installations:InstallationApi({
    title:'Company'
  })
}

const installations = Installations({
  api:apis.installations,
  route:'companies',
  title:'Company',
  pluralTitle:'Companies',
  userEventHandler:userEventHandler('installations')
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
  installations,
  InstallationMenu({
    action:installations.controllers.table.actions.get.request,
    selector:(state) => installations.controllers.table.getState(state)
  })
], {
  // cli override settings here
})

ReactDOM.render(
  Root,
  document.getElementById('mount')
)