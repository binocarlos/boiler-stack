import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import PassportApp from '../boiler-ui/apps/passport'
import Crud from '../boiler-ui/plugins/crud'


import AppFactory from 'boiler-frontend/src/factory'
import { open_snackbar } from 'boiler-frontend/src/actions'


import Config from './config'


import mongoCrudAjaxFactory from '../folder-ui/api/mongocrud'

const apis = {
  mongocrud:mongoCrudAjaxFactory
}

const plugins = {
  crud:Crud
}

export const userEventHandler = (section) => {
  const logger = bows(section + ':events')
  return (store, userEvent) => {
    logger('user event', userEvent)
    if(userEvent.snackbar) store.dispatch(open_snackbar(userEvent.message))
  }
}

const plugins = PassportApp(Config())
const Root = AppFactory(plugins, {
  // cli overrides here
})

ReactDOM.render(
  Root,
  document.getElementById('mount')
)