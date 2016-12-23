import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import AppFactory from '../boiler-ui/lib/factory'

import AppBar from '../boiler-ui/lib/plugins/appbar'

const plugins = [
  AppBar({
    title: 'My Test App'
  })
]

const render = AppFactory(plugins)

ReactDOM.render(
  render(),
  document.getElementById('mount')
)