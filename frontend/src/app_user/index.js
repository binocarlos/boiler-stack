import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import AppFactory from 'boiler-frontend/src/factory'
import app from './app'

const Root = AppFactory(app, {
  // cli overrides here
})

ReactDOM.render(
  Root,
  document.getElementById('mount')
)