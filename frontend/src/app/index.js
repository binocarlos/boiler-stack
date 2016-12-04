import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import AppFactory from '../boiler-frontend/factory'
import Settings from './settings'

var Root = AppFactory(Settings())

ReactDOM.render(
  Root,
  document.getElementById('mount')
)