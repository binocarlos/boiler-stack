import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import AppFactory from '../boiler-ui/lib/factory'
import Core from '../boiler-ui/lib/plugins/core'
//import app from './app'

import Wrapper from './components/Wrapper'

const plugins = [Core()]
const render = AppFactory(plugins)

ReactDOM.render(
  render(Wrapper),
  document.getElementById('mount')
)