import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import PassportApp from '../boiler-ui/apps/passport'
import AppFactory from 'boiler-frontend/src/factory'

import Config from './config'

const plugins = PassportApp(Config())
const Root = AppFactory(plugins, {
  // cli overrides here
})

ReactDOM.render(
  Root,
  document.getElementById('mount')
)